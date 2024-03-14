import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";
import { Response } from "express";

import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { BranchesService } from "./branches.service";
import { BrancheDTO } from "./branches.dto/branches-create.dto";
import { BrancheDetailResponse } from "./branches.response/branches-detail.response";
import { BrancheUpdateDTO } from "./branches.dto/branches-update.dto";
import { Branches } from "./branches.entity/branches.entity";
import { BranchesResponse } from "./branches.response/branches.response";

@Controller({
  version: VersionEnum.V1.toString(),
  path: "branches",
})
@ApiBearerAuth()
export class BranchesController {
  constructor(private branchesService: BranchesService) { }

  @Post("/create")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("BrancheResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo thương hiệu" })
  async create(
    @Body(new ValidationPipe()) branchesDTO: BrancheDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingBranches: Branches = await this.branchesService.findWithName(
      branchesDTO.restaurant_id,
      branchesDTO.restaurant_brand_id,
      branchesDTO.name
    );

    if (existingBranches) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên chi nhánh [${branchesDTO.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    const savedBranche: Branches = await this.branchesService.create(
      employee.id,
      branchesDTO
    ) as Branches;

    if (!savedBranche) {
      response.setMessage(HttpStatus.BAD_REQUEST, "Tạo chi nhánh thất bại!");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new BrancheDetailResponse(savedBranche as Branches));
    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/create-multi")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("BrancheResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhiều chi nhánh" })
  async createMulti(
    @Body(new ValidationPipe()) branchesDTO: BrancheDTO[],
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingBranches: Branches[] = await this.branchesService.findNameArray(
      branchesDTO.map(item => item.restaurant_id),
      branchesDTO.map(item => item.restaurant_brand_id),
      branchesDTO.map(item => item.name),
    )

    if (existingBranches.length > 0) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên chi nhánh [${existingBranches.map(item => item.name)}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(new BranchesResponse().mapToList(await this.branchesService.create(employee.id, branchesDTO) as Branches[]))
    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/:id/update")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("BrancheResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chỉnh sửa chi nhánh" })
  async updateBrand(
    @Body(new ValidationPipe()) branchesUpdateDTO: BrancheUpdateDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {

    let response: ResponseData = new ResponseData();

    let existingBranche: Branches = await this.branchesService.findWithId(id, employee.id);

    if (!existingBranche) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy chi nhánh!`
        ),
        HttpStatus.OK
      );
    }

    let existingBrancheName: Branches = await this.branchesService.findWithName(
      existingBranche.restaurant_id,
      existingBranche.restaurant_brand_id,
      branchesUpdateDTO.name
    )

    if (existingBrancheName) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên chi nhánh [${branchesUpdateDTO.name}] đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    existingBranche.name = branchesUpdateDTO.name;
    existingBranche.updated_at = new Date();

    const updatedBranche: Branches = await this.branchesService.update(existingBranche);

    if (!updatedBranche) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Cập nhật chi nhánh không thành công!`
        ),
        HttpStatus.OK
      );
    };

    response.setData(updatedBranche)
    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/:id")
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("BrancheResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chi tiết chi nhánh" })
  async brancheDetail(
    @Param("id") id: number,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingBranche: Branches = await this.branchesService.findWithId(id, employee.id);

    if (!existingBranche) {
      response.setMessage(404, "Không tìm thấy chi nhánh");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new BrancheDetailResponse(existingBranche));
    return res.status(HttpStatus.OK).send(response);
  }

  @Get()
  @UseGuards(ValidationPipe)
  @UsePipes()
  @ApiBearerAuth()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("BrancheResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Danh sách chi nhánh" })
  async branches(
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    let branches: Branches[] = await this.branchesService.findAll(employee.id);

    if (branches.length === 0) {
      response.setMessage(HttpStatus.BAD_REQUEST, "Không tìm thấy danh sách chi nhánh")
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new BranchesResponse().mapToList(branches));
    return res.status(HttpStatus.OK).send(response);
  }
}