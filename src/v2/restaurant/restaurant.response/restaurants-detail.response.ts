import { ApiProperty } from "@nestjs/swagger";
import { Restaurant } from "../restaurant.entity/restaurant.entity";

export class RestaurantDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của nhà hàng",
  })
  id: number;
  name: string;
  status: number;
  created_at: Date;

  constructor(restaurant?: Restaurant) {
    this.id = restaurant.id;
    this.name = restaurant.name;
    this.status = restaurant.status;
    this.created_at = restaurant.created_at;
  }
}
