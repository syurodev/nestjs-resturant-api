import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
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
import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { ExtendService } from "./extend.service";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { Response } from "express";

@Controller({
  version: VersionEnum.V1.toString(),
  path: "extend",
})
@ApiBearerAuth()
export class ExtendController {
  constructor(private extendService: ExtendService) {}

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
              $ref: getSchemaPath("ExtendResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chi tiết danh sách nhà hàng" })
  async getRestaurantDetail(
    @GetUserFromToken() employee: Employee,
    @Res() res: Response,
    @Query() query: { status?: number }
  ) {
    let response: ResponseData = new ResponseData();

    response.setData(
      await this.extendService.getRestaurantDetail(
        employee.id,
        query.status ?? -1
      )
    );
    return res.status(HttpStatus.OK).send(response);
  }
}
