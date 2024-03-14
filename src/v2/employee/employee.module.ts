import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { EmployeeController } from "./employee.controller";
import { Employee } from "./employee.entity/employee.entity";
import { EmployeeService } from "./employee.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: "1235sd-5656sdf-@dfkdf-sdsjfdj",
    }),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
