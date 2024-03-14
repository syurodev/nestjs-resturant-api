import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
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
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller({
  version: VersionEnum.V2.toString(),
  path: "restaurants",
})
@ApiBearerAuth()
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Post("/create")
  @UseGuards(ValidationPipe)
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

    await this.restaurantService.create(employee.id, restaurantDTO);

    return res.status(HttpStatus.OK).send(response);
  }
}
