import {
  Body,
  Controller,
  Get,
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
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";
import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { RestaurantBrandService } from "./restaurant-brand.service";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { RestaurantBrandDetailResponse } from "./restaurant-brand.response/restaurant-brand-detail.response";
import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";
import { RestaurantBrandsResponse } from "./restaurant-brand.response/restaurant-brands.response";

@Controller({
  version: VersionEnum.V2.toString(),
  path: "restaurant-brands",
})
@ApiBearerAuth()
export class RestaurantBrandController {
  constructor(private restaurantBrandService: RestaurantBrandService) {}

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
              $ref: getSchemaPath("RestaurantBrandResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo thương hiệu" })
  async create(
    @Body(new ValidationPipe()) restaurantBrandDTO: RestaurantBrandDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingRestaurantBrand: RestaurantBrand =
      await this.restaurantBrandService.findWithRestaurantIdAndName(
        restaurantBrandDTO.restaurant_id,
        restaurantBrandDTO.name
      );

    if (existingRestaurantBrand) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên thương hiệu [${restaurantBrandDTO.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    let savedRestaurantBrand: RestaurantBrand =
      (await this.restaurantBrandService.create(
        employee.id,
        restaurantBrandDTO
      )) as RestaurantBrand;

    if (!savedRestaurantBrand) {
      response.setMessage(400, "Tạo thương hiệu thất bại!");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new RestaurantBrandDetailResponse(savedRestaurantBrand));
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
              $ref: getSchemaPath("RestaurantBrandResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhiều thương hiệu" })
  async createMulti(
    @Body(new ValidationPipe()) restaurantBrandDTO: RestaurantBrandDTO[],
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let savedRestaurantBrand: RestaurantBrand[] =
      (await this.restaurantBrandService.createMulti(
        employee.id,
        restaurantBrandDTO
      )) as RestaurantBrand[];

    response.setData(
      new RestaurantBrandsResponse().mapToList(savedRestaurantBrand)
    );
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
              $ref: getSchemaPath("RestaurantBrandResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chỉnh sửa thương hiệu" })
  async updateBrand(
    @Body(new ValidationPipe()) restaurantBrandDTO: RestaurantBrandDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingRestaurantBrand: RestaurantBrand =
      await this.restaurantBrandService.findRestaurantBrandWithId(
        id,
        employee.id
      );

    if (!existingRestaurantBrand) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy thương hiệu!`
        ),
        HttpStatus.OK
      );
    }

    existingRestaurantBrand.name = restaurantBrandDTO.name;
    existingRestaurantBrand.updated_at = new Date();

    let updatedRestaurantBrand: RestaurantBrand =
      await this.restaurantBrandService.update(existingRestaurantBrand);

    if (!updatedRestaurantBrand) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Cập nhật thương hiệu không thành công!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(new RestaurantBrandDetailResponse(updatedRestaurantBrand));
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
              $ref: getSchemaPath("RestaurantBrandResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Chi tiết thương hiệu" })
  async brandDetail(
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let existingRestaurantBrand: RestaurantBrand =
      await this.restaurantBrandService.findRestaurantBrandWithId(
        id,
        employee.id
      );

    if (!existingRestaurantBrand) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy thương hiệu!`
        ),
        HttpStatus.OK
      );
    }

    response.setData(
      new RestaurantBrandDetailResponse(existingRestaurantBrand)
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
              $ref: getSchemaPath("RestaurantBrandResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiOperation({ summary: "Danh sách thương hiệu" })
  async listBrand(
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    response.setData(
      new RestaurantBrandsResponse().mapToList(
        await this.restaurantBrandService.findAll(employee.id)
      )
    );

    return res.status(HttpStatus.OK).send(response);
  }
}
