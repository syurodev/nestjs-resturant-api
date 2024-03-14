import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { Employee } from "./employee.entity/employee.entity";
export declare class EmployeeService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    findOne(id: number): Promise<Employee>;
    findOneByPhone(phoneNumber: string): Promise<Employee>;
    findOneByUsername(username: string): Promise<Employee>;
    findOneById(id: number): Promise<Employee | null>;
    create(employee: Employee): Promise<Employee>;
    update(employee: Employee): Promise<Employee>;
    updatePassword(employee: Employee): Promise<Employee>;
    updateStatus(employee: Employee): Promise<any>;
    getEmployeeDetail(employeeId: number): Promise<Employee>;
    getEmployees(): Promise<Employee[]>;
}
