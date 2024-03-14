import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { GenerateToken } from "src/utils.common/utils.generate-token.common/utils.generate-token.common";
import { Repository } from "typeorm";

import { Password } from "src/utils.common/utils.password.common/utils.password.common";
import { Employee } from "./employee.entity/employee.entity";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,

        private jwtService: JwtService
    ) { }

    /**
     *
     * @param id
     * @returns
     */
    async findOne(id: number): Promise<Employee> {
        return await this.employeeRepository.findOne({ where: { id: id } });
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

    async findOneById(id: number): Promise<Employee | null> {
        let existingEmployee = await this.employeeRepository.findOneBy({
            id: id
        })

        if (!existingEmployee) return null;

        return existingEmployee;
    }

    /**
     *
     * @param employeeDTO
     * @returns
     */
    async create(employee: Employee): Promise<Employee> {
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
        return await this.employeeRepository.save(employee);
    }

    async updatePassword(employee: Employee): Promise<Employee> {
        return await this.employeeRepository.save(employee);
    }

    async updateStatus(employee: Employee): Promise<any> {
        return await this.employeeRepository.save(employee);
    }

    async getEmployeeDetail(employeeId: number): Promise<Employee> {
        return await this.employeeRepository.findOneBy({ id: employeeId })
    }

    async getEmployees(): Promise<Employee[]> {
        return await this.employeeRepository.find()
    }
}
