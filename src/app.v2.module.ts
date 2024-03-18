import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./v2/auth/auth.module";
import { EmployeeModule } from "./v2/employee/employee.module";
import { RestaurantModule } from "./v2/restaurant/restaurant.module";
import { RestaurantBrandModule } from "./v2/restaurant-brand/restaurant-brand.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    AuthModule,
    EmployeeModule,
    RestaurantModule,
    RestaurantBrandModule,
  ],
  controllers: [],
  providers: [],
})
export class AppV2Module {}
