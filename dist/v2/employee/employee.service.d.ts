import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { EmployeeDTO } from "./employee.dto/employee-register.dto";
import { Employee } from "./employee.entity/employee.entity";
export declare class EmployeeService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    findOne(id: number): Promise<Employee>;
    findAll(): Promise<Employee>;
    findOneByPhone(phoneNumber: string): Promise<Employee>;
    findOneByUsername(username: string): Promise<Employee>;
    create(employeeDTO: EmployeeDTO): Promise<Employee>;
    update(employee: Employee): Promise<Employee>;
}
