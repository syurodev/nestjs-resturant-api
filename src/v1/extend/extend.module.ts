import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExtendService } from "./extend.service";
import { ExtendController } from "./extend.controller";
import { Restaurant } from "../restaurant/restaurant.entity/restaurant.entity";
import { RestaurantBrand } from "../restaurant-brand/restaurant-brand.entity/restaurant-brand.entity";
import { Branches } from "../branches/branches.entity/branches.entity";
import { Areas } from "../areas/areas.entity/areas.entity";
import { Tables } from "../tables/tables.entity/tables.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Restaurant,
      RestaurantBrand,
      Branches,
      Areas,
      Tables,
    ]),
  ],
  providers: [ExtendService],
  controllers: [ExtendController],
})
export class ExtendModule {}
