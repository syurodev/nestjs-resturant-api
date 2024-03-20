import {
  Body,
  Controller,
  Get,
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
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { TablesService } from "./tables.service";
import { TableCreateDTO } from "./tables.dto/table-create.dto";
import { Tables } from "./tables.entity/tables.entity";
import { TableDetailResponse } from "./tables.response/table-detail.response";
import { TableUpdateDTO } from "./tables.dto/table-update.dto";
import { TablesResponse } from "./tables.response/tables.response";

@Controller({
  version: VersionEnum.V2.toString(),
  path: "tables",
})
@ApiBearerAuth()
export class TablesController {
  constructor(private tablesService: TablesService) {}

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

    const savedTable: Tables = (await this.tablesService.create(
      employee.id,
      tableCreateDto
    )) as Tables;

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

    const savedTables: Tables[] = (await this.tablesService.createMulti(
      employee.id,
      tableCreateDto
    )) as Tables[];
    response.setData(new TablesResponse().mapToList(savedTables));
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
  async update(
    @Body(new ValidationPipe()) tableUpdateDto: TableUpdateDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    const updatedTable: Tables = await this.tablesService.update(
      employee.id,
      id,
      tableUpdateDto
    );

    response.setData(new TableDetailResponse(updatedTable));
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
  async detail(
    @Param("id") id: number,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    const response: ResponseData = new ResponseData();

    response.setData(
      new TableDetailResponse(
        await this.tablesService.findWithId(id, employee.id)
      )
    );
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
  async branches(@Res() res: Response, @GetUserFromToken() employee: Employee) {
    const response: ResponseData = new ResponseData();

    response.setData(
      new TablesResponse().mapToList(
        await this.tablesService.findAll(employee.id)
      )
    );
    return res.status(HttpStatus.OK).send(response);
  }
}
