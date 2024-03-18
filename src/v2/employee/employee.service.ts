import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { GenerateToken } from "src/utils.common/utils.generate-token.common/utils.generate-token.common";
import { HandleBase64 } from "src/utils.common/utils.handle-base64.common/utils.handle-base64.common";
import { Repository } from "typeorm";

import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import { EmployeeDTO } from "./employee.dto/employee-register.dto";
import { Employee } from "./employee.entity/employee.entity";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    private jwtService: JwtService
  ) {}

  /**
   *
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<Employee> {
    let existingEmployee: [ResultSetHeader, [Employee]] =
      await this.employeeRepository.query(
        `
          CALL phamtuanvu.sp_g_employee(?, @c, @m);
          SELECT @c as status, @m as message;
        `,
        [id]
      );

    return new StoreProcedureResult<Employee>().getResultDetail(
      existingEmployee
    );
  }

  async findAll(): Promise<Employee> {
    const existingEmployee = await this.employeeRepository.query(
      `
        CALL phamtuanvu.sp_g_employees(@c, @m);
        SELECT @c as status, @m as message;
      `
    );
    return new StoreProcedureResult<Employee>().getResultList(existingEmployee);
  }

  /**
   *
   * @param phoneNumber
   * @returns
   */
  async findOneByPhone(phoneNumber: string): Promise<Employee> {
    return await this.employeeRepository.findOne({
      where: { phone_number: phoneNumber },
    });
  }

  async findOneByUsername(username: string): Promise<Employee> {
    return await this.employeeRepository.findOne({
      where: { username: username },
    });
  }

  /**
   *
   * @param employeeDTO
   * @returns
   */
  async create(employeeDTO: EmployeeDTO): Promise<Employee> {
    let employee: Employee = new Employee();

    employee.full_name = employeeDTO.full_name;
    employee.phone_number = employeeDTO.phone_number;
    employee.username = employeeDTO.username;
    employee.password = await HandleBase64.decodePasswordBase64(
      employeeDTO.password
    );

    let generateToken = new GenerateToken(employee.username);
    employee.access_token = await this.jwtService.sign(
      JSON.stringify(generateToken)
    );

    employee.password = String(
      await Password.bcryptPassword(employee.password)
    );

    await this.employeeRepository.save(employee);

    return employee;
  }

  async update(employee: Employee): Promise<Employee> {
    let updatedEmployee: [ResultSetHeader, [Employee]] =
      await this.employeeRepository.query(
        "CALL sp_u_employee(?, ?, ?, ?, @e, @m)",
        [
          employee.id,
          employee.full_name,
          employee.phone_number,
          employee.gender,
        ]
      );

    return updatedEmployee[0][0];
  }

  async updateStatus(employeeId: number, newStatus: number): Promise<Employee> {
    let updatedEmployee: [ResultSetHeader, [Employee]] =
      await this.employeeRepository.query(
        `
          CALL phamtuanvu.sp_u_employee_status(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
        [employeeId, newStatus]
      );

    return new StoreProcedureResult<Employee>().getResultDetail(
      updatedEmployee
    );
  }

  async updatePassword(
    employeeId: number,
    newPassword: string
  ): Promise<Employee> {
    let updatedEmployee: [ResultSetHeader, [Employee]] =
      await this.employeeRepository.query(
        `
          CALL phamtuanvu.sp_u_employee_password(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
        [employeeId, newPassword]
      );

    return new StoreProcedureResult<Employee>().getResultDetail(
      updatedEmployee
    );
  }
}
