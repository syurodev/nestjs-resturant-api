import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import { Response } from "express";

import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { AreasService } from "./areas.service";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
import { Areas } from "./areas.entity/areas.entity";
import { AreaDetailResponse } from "./areas.response/area-detail.response";
import { AreaUpdateDTO } from "./areas.dto/area-update.dto";
import { AreasResponse } from "./areas.response/areas.response";

@Controller({
  version: VersionEnum.V1.toString(),
  path: "areas",
})
@ApiBearerAuth()
export class AreasController {
  constructor(private areasService: AreasService) {}

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
              $ref: getSchemaPath("AreaResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo khu vực" })
  async create(
    @Body(new ValidationPipe()) areaCreateDto: AreaCreateDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    const existingArea: Areas = await this.areasService.findWithName(
      areaCreateDto.restaurant_id,
      areaCreateDto.restaurant_brand_id,
      areaCreateDto.branch_id,
      areaCreateDto.name
    );

    if (existingArea) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên khu vực [${areaCreateDto.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    const savedArea = await this.areasService.create(
      employee.id,
      areaCreateDto
    );

    if (!savedArea) {
      response.setMessage(400, "Tạo khu vực thất bại!");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new AreaDetailResponse(savedArea as Areas));
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
              $ref: getSchemaPath("AreaResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhiều khu vực" })
  async createMulti(
    @Body(new ValidationPipe()) areaCreateDto: AreaCreateDTO[],
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingArea: Areas[] = await this.areasService.findNameArray(
      areaCreateDto.map((item) => item.restaurant_id),
      areaCreateDto.map((item) => item.restaurant_brand_id),
      areaCreateDto.map((item) => item.branch_id),
      areaCreateDto.map((item) => item.name)
    );

    if (existingArea.length > 0) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên khu vực [${existingArea.map(
            (item) => item.name
          )}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    let savedArea: Areas[] = (await this.areasService.create(
      employee.id,
      areaCreateDto
    )) as Areas[];

    response.setData(new AreasResponse().mapToList(savedArea));
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
              $ref: getSchemaPath("AreaResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chỉnh sửa khu vực" })
  async updateBrand(
    @Body(new ValidationPipe()) branchesUpdateDTO: AreaUpdateDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingArea: Areas = await this.areasService.findWithId(
      id,
      employee.id
    );

    if (!existingArea) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy khu vực!`
        ),
        HttpStatus.OK
      );
    }

    // if (employee.id !== existingArea.employee_id) {
    //   response.setMessage(400, "Bạn không có quyền chỉnh sửa khu vực này!")
    // }

    let existingAreaName: Areas = await this.areasService.findWithName(
      existingArea.restaurant_id,
      existingArea.restaurant_brand_id,
      existingArea.branch_id,
      branchesUpdateDTO.name
    );

    if (existingAreaName) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên khu vực [${branchesUpdateDTO.name}] đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    existingArea.name = branchesUpdateDTO.name;
    existingArea.updated_at = new Date();

    const updatedArea: Areas = await this.areasService.update(existingArea);

    if (!updatedArea) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Cập nhật khu vực không thành công!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(new AreaDetailResponse(updatedArea));
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
              $ref: getSchemaPath("AreaResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chi tiết khu vực" })
  async brancheDetail(
    @Param("id") id: number,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingArea: Areas = await this.areasService.findWithId(
      id,
      employee.id
    );

    if (!existingArea) {
      response.setMessage(HttpStatus.BAD_REQUEST, "Không tìm thấy khu vực");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new AreaDetailResponse(existingArea));
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
              $ref: getSchemaPath("AreaResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Danh sách khu vực" })
  async branches(@Res() res: Response, @GetUserFromToken() employee: Employee) {
    let response: ResponseData = new ResponseData();

    let areas: Areas[] = await this.areasService.findAll(employee.id);

    if (!areas || areas.length === 0) {
      response.setMessage(
        HttpStatus.BAD_REQUEST,
        "Không tìm thấy danh sách khu vực"
      );
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new AreasResponse().mapToList(areas));
    return res.status(HttpStatus.OK).send(response);
  }
}
