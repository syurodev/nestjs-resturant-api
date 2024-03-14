import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";
import { Response } from "express";

import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { TablesService } from "./tables.service";
import { TableCreateDTO } from "./tables.dto/table-create.dto";
import { Tables } from "./tables.entity/tables.entity";
import { TableDetailResponse } from "./tables.response/table-detail.response";
import { TableUpdateDTO } from "./tables.dto/table-update.dto";
import { TablesResponse } from "./tables.response/tables.response";

@Controller({
  version: VersionEnum.V1.toString(),
  path: "tables",
})
@ApiBearerAuth()
export class TablesController {
  constructor(private tablesService: TablesService) { }

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
              $ref: getSchemaPath("TableResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo bàn" })
  async create(
    @Body(new ValidationPipe()) tableCreateDto: TableCreateDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingTable: Tables = await this.tablesService.findWithName(
      tableCreateDto.restaurant_id,
      tableCreateDto.restaurant_brand_id,
      tableCreateDto.area_id,
      tableCreateDto.name
    );

    if (existingTable) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên bàn [${tableCreateDto.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    const savedTable: Tables = await this.tablesService.create(employee.id, tableCreateDto) as Tables;

    if (!savedTable) {
      response.setMessage(400, "Tạo bàn thất bại!");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new TableDetailResponse(savedTable));
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
              $ref: getSchemaPath("TableResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhiều bàn" })
  async createMulti(
    @Body(new ValidationPipe()) tableCreateDto: TableCreateDTO[],
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    const existingTables: Tables[] = await this.tablesService.findNameArray(
      tableCreateDto.map(item => item.restaurant_id),
      tableCreateDto.map(item => item.restaurant_brand_id),
      tableCreateDto.map(item => item.area_id),
      tableCreateDto.map(item => item.name),
    ) as Tables[];

    if (existingTables && existingTables.length > 0) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên bàn [${existingTables.map(item => item.name)}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    const savedTables: Tables[] = await this.tablesService.create(
      employee.id,
      tableCreateDto
    ) as Tables[];

    if (!savedTables || savedTables.length === 0) {
      response.setMessage(400, "Tạo bàn thất bại!");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new TablesResponse().mapToList(savedTables))
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
              $ref: getSchemaPath("TableResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chỉnh sửa bàn" })
  async updateBrand(
    @Body(new ValidationPipe()) tableUpdateDto: TableUpdateDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {

    let response: ResponseData = new ResponseData();

    let existingTable: Tables = await this.tablesService.findWithId(
      id,
      employee.id
    );

    if (!existingTable) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy bàn!`
        ),
        HttpStatus.OK
      );
    }

    let existingTableName: Tables = await this.tablesService.findWithName(
      existingTable.restaurant_id,
      existingTable.restaurant_brand_id,
      existingTable.area_id,
      tableUpdateDto.name
    )

    if (existingTableName) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên bàn [${tableUpdateDto.name}] đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    existingTable.name = tableUpdateDto.name;
    existingTable.updated_at = new Date();

    const updatedTable: Tables = await this.tablesService.update(existingTable);

    if (!updatedTable) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Cập nhật bàn không thành công!`
        ),
        HttpStatus.OK
      );
    };

    response.setData(new TableDetailResponse(updatedTable))
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
              $ref: getSchemaPath("TableResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chi tiết bàn" })
  async brancheDetail(
    @Param("id") id: number,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    const existingTable: Tables = await this.tablesService.findWithId(
      id,
      employee.id
    );

    if (!existingTable) {
      response.setMessage(404, "Không tìm thấy bàn");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new TableDetailResponse(existingTable));
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
              $ref: getSchemaPath("TableResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Danh sách bàn" })
  async branches(
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    response.setData(new TablesResponse().mapToList(
      await this.tablesService.findAll(employee.id)
    ));
    return res.status(HttpStatus.OK).send(response);
  }
}