import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../restaurant.entity/restaurant.entity";

export class RestaurantDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của nhà hàng",
  })

  restaurant: Restaurant

  constructor(restaurant?: Restaurant) {
    this.restaurant = restaurant
  }
}
