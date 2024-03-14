import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EmployeeModule } from "../employee/employee.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [EmployeeModule],
})
export class AuthModule {}
