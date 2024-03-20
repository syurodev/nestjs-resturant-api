import { ApiProperty } from "@nestjs/swagger";
import { RestaurantBrand } from "../restaurant-brand.entity/restaurant-brand.entity";

export class RestaurantBrandDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của thương hiệu",
  })
  id: number;
  name: string;
  status: number;
  created_at: Date;

  constructor(brand?: RestaurantBrand) {
    this.id = brand.id;
    this.name = brand.name;
    this.status = brand.status;
    this.created_at = brand.created_at;
  }
}
