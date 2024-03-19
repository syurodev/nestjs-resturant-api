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
import { AreasService } from "./areas.service";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
import { Areas } from "./areas.entity/areas.entity";
import { AreaDetailResponse } from "./areas.response/area-detail.response";
import { AreaUpdateDTO } from "./areas.dto/area-update.dto";
import { AreasResponse } from "./areas.response/areas.response";

@Controller({
  version: VersionEnum.V2.toString(),
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

    const savedArea = await this.areasService.create(
      employee.id,
      areaCreateDto
    );

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

    let savedArea: Areas[] = (await this.areasService.createMulti(
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
  async update(
    @Body(new ValidationPipe()) areaUpdateDTO: AreaUpdateDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();
    const updatedArea: Areas = await this.areasService.update(
      employee.id,
      id,
      areaUpdateDTO
    );

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
  async detail(
    @Param("id") id: number,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingArea: Areas = await this.areasService.findWithId(
      id,
      employee.id
    );

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
  async areas(@Res() res: Response, @GetUserFromToken() employee: Employee) {
    let response: ResponseData = new ResponseData();

    let areas: Areas[] = await this.areasService.findAll(employee.id);

    response.setData(new AreasResponse().mapToList(areas));
    return res.status(HttpStatus.OK).send(response);
  }
}
