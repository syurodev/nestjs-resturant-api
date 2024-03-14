import { Response } from "express";
import { EmployeeService } from "./employee.service";
import { EmployeeDTO } from "./employee.dto/employee-register.dto";
import { Employee } from "./employee.entity/employee.entity";
import { EmployeeUpdateDTO } from "./employee.dto/employee-update.dto";
import { EmployeeUpdatePasswordDTO } from "./employee.dto/employee-update-password.dto";
import { EmployeeUpdateStatusDTO } from "./employee.dto/employee-update-status";
export declare class EmployeeController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    create(employeeDTO: EmployeeDTO, res: Response): Promise<any>;
    updateEmployee(employeeUpdateDTO: EmployeeUpdateDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    updateEmployeePassword(employeeUpdatePasswordDTO: EmployeeUpdatePasswordDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    updateStatus(employeeUpdateStatusDTO: EmployeeUpdateStatusDTO, res: Response, employee: Employee, id: number): Promise<Response<any, Record<string, any>>>;
    employeeDetail(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    employees(res: Response): Promise<Response<any, Record<string, any>>>;
}
