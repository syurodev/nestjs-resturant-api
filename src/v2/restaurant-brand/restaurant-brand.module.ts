import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantBrandService } from "./restaurant-brand.service";
import { RestaurantBrandController } from "./restaurant-brand.controller";
import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantBrand])],
  providers: [RestaurantBrandService],
  controllers: [RestaurantBrandController],
})
export class RestaurantBrandModule {}
