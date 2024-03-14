import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "../employee.entity/employee.entity";

export class EmployeeDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của nhân viên",
  })

  employee: Employee;

  constructor(employee?: Employee) {
    this.employee = employee
  };

}
