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
import { Response } from "express";

import { GetUserFromToken } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { VersionEnum } from "src/utils.common/utils.enum.common/utils.version.enum";
import { ExceptionResponseDetail } from "src/utils.common/utils.exceptions.common/utils.exception-common";
import { ResponseData } from "src/utils.common/utils.response.common/utils.response.common";
import { Employee } from "../employee/employee.entity/employee.entity";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { Restaurant } from "./restaurant.entity/restaurant.entity";
import { RestaurantService } from "./restaurant.service";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from "@nestjs/swagger";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { RestaurantDetailResponse } from "./restaurant.response/restaurants-detail.response";
import { RestaurantsResponse } from "./restaurant.response/restaurants.response";

@Controller({
  version: VersionEnum.V2.toString(),
  path: "restaurants",
})
@ApiBearerAuth()
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Post("/create")
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("RestaurantResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhà hàng" })
  async create(
    @Body(new ValidationPipe()) restaurantDTO: RestaurantDTO,
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ): Promise<any> {
    let response: ResponseData = new ResponseData();

    let createdRestaurant: Restaurant = (await this.restaurantService.create(
      employee.id,
      restaurantDTO
    )) as Restaurant;

    if (!createdRestaurant) {
      response.setMessage(
        HttpStatus.BAD_REQUEST,
        "Tạo nhà hàng không thành công"
      );
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(createdRestaurant);
    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/:id/update")
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("RestaurantResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Chỉnh sửa nhà hàng" })
  async update(
    @Body(new ValidationPipe()) restaurantDTO: RestaurantDTO,
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ): Promise<any> {
    let response: ResponseData = new ResponseData();

    let updatedRestaurant: Restaurant = await this.restaurantService.updateName(
      employee.id,
      id,
      restaurantDTO.name
    );

    if (!updatedRestaurant) {
      response.setMessage(
        HttpStatus.BAD_REQUEST,
        "Cập nhật nhà hàng không thành công!"
      );
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new RestaurantDetailResponse(updatedRestaurant));
    return res.status(HttpStatus.OK).send(response);
  }

  @Post("/create-multi")
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("RestaurantResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Tạo nhiều nhà hàng" })
  async createMulti(
    @Body(new ValidationPipe()) restaurantDTO: RestaurantDTO[],
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ): Promise<any> {
    let response: ResponseData = new ResponseData();

    let createdRestaurants: Restaurant[] =
      (await this.restaurantService.createMulti(
        employee.id,
        restaurantDTO
      )) as Restaurant[];

    response.setData(new RestaurantsResponse().mapToList(createdRestaurants));
    return res.status(HttpStatus.OK).send(response);
  }

  @Get("/:id")
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("RestaurantResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Chi tiết nhà hàng" })
  async restaurantDetail(
    @Res() res: Response,
    @Param("id") id: number,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    let restaurant: Restaurant = await this.restaurantService.findOneById(
      id,
      employee.id
    );

    response.setData(new RestaurantDetailResponse(restaurant));
    return res.status(HttpStatus.OK).send(response);
  }

  @Get()
  @UsePipes()
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(SwaggerResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath("RestaurantResponse"),
            },
          },
        },
      ],
    },
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: "Danh sách nhà hàng" })
  async findAll(@Res() res: Response, @GetUserFromToken() employee: Employee) {
    let response: ResponseData = new ResponseData();

    let restaurant: Restaurant[] = await this.restaurantService.findAll(
      employee.id
    );

    response.setData(new RestaurantsResponse().mapToList(restaurant));
    return res.status(HttpStatus.OK).send(response);
  }
}
