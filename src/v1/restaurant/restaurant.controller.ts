import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
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
import { RestaurantsResponse } from "./restaurant.response/restaurants.response";
import { RestaurantDetailResponse } from "./restaurant.response/restaurants-detail.response";

@Controller({
  version: VersionEnum.V1.toString(),
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

    let restaurant: Restaurant = await this.restaurantService.findOneByName(
      restaurantDTO.name
    );

    if (restaurant) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên nhà hàng [${restaurantDTO.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }
    console.log(RestaurantDTO);
    let createdRestaurant: Restaurant = (await this.restaurantService.create(
      employee.id,
      RestaurantDTO
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

    let existingRestaurant: Restaurant[] =
      await this.restaurantService.findNameArray(
        restaurantDTO.map((item) => item.name)
      );

    if (existingRestaurant && existingRestaurant.length > 0) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên nhà hàng [${existingRestaurant.map(
            (item) => item.name
          )}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    let createdRestaurants: Restaurant[] = (await this.restaurantService.create(
      employee.id,
      restaurantDTO
    )) as Restaurant[];

    if (!createdRestaurants && createdRestaurants.length === 0) {
      response.setMessage(HttpStatus.BAD_REQUEST, "Tạo nhà hàng thất bại");
      return res.status(HttpStatus.OK).send(response);
    }

    response.setData(new RestaurantsResponse().mapToList(createdRestaurants));
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
  @ApiOperation({ summary: "Lấy danh sách nhà hàng" })
  async getRestaurants(
    @Res() res: Response,
    @GetUserFromToken() employee: Employee
  ) {
    let response: ResponseData = new ResponseData();

    response.setData(
      new RestaurantsResponse().mapToList(
        await this.restaurantService.findAll(employee.id)
      )
    );

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

    let restaurant: Restaurant = await this.restaurantService.findOneByName(
      restaurantDTO.name
    );

    if (restaurant) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Tên nhà hàng [${restaurantDTO.name}] này đã tồn tại!`
        ),
        HttpStatus.OK
      );
    }

    let existingRestaurant: Restaurant =
      await this.restaurantService.findOneById(id, employee.id);

    if (!existingRestaurant) {
      throw new HttpException(
        new ExceptionResponseDetail(
          HttpStatus.BAD_REQUEST,
          `Không tìm thấy nhà hàng!`
        ),
        HttpStatus.OK
      );
    }

    existingRestaurant.name = restaurantDTO.name;
    existingRestaurant.updated_at = new Date();

    let updatedRestaurant: Restaurant = await this.restaurantService.update(
      existingRestaurant
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

    let restaurant = await this.restaurantService.findOneById(id, employee.id);

    if (!restaurant) {
      response.setMessage(404, "Không tìm thấy nhà hàng!");
      return res.status(HttpStatus.NOT_FOUND).send(response);
    }

    response.setData(new RestaurantDetailResponse(restaurant));
    return res.status(HttpStatus.OK).send(response);
  }
}
