import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { Restaurant } from "./restaurant.entity/restaurant.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RestaurantBrandModule } from "../restaurant-brand/restaurant-brand.module";
// import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant]),
    RestaurantBrandModule,
    // RouterModule.register([
    //   {
    //     path: '/restaurants',
    //     children: [
    //       {
    //         path: "/:restaurantid/brands",
    //         module: RestaurantBrandModule,
    //       }
    //     ]
    //   }
    // ])
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule { }
