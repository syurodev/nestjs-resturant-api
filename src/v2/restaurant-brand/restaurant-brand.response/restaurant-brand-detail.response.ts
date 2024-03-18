import { ApiProperty } from "@nestjs/swagger";
import { RestaurantBrand } from "../restaurant-brand.entity/restaurant-brand.entity";

export class RestaurantBrandDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của thương hiệu",
  })

  brand: RestaurantBrand

  constructor(brand?: RestaurantBrand) {
    this.brand = brand
  }
}
