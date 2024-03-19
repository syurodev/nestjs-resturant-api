import { ApiProperty } from "@nestjs/swagger";
import { Employee } from "../employee.entity/employee.entity";

export class EmployeesResponse {
  id: number;
  username: string;
  full_name: string;
  gender: number;
  phone_number: string;
  birthday: Date;

  constructor(employee?: Employee) {
    this.id = employee?.id
    this.username = employee?.username
    this.full_name = employee?.full_name
    this.gender = employee?.gender
    this.phone_number = employee?.phone_number
    this.birthday = employee?.birthday
  }

  mapToList(list: Employee[]) {
    const result = list.map((item) => (
      new EmployeesResponse(item)
    ))

    return result
  }
}
