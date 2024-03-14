import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "src/v1/employee/employee.entity/employee.entity";

export class AuthTokenResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "token của nhân viên",
  })
  access_token: string;

  constructor(employee?: Employee) {
    this.access_token = employee?.access_token;
  }
}
