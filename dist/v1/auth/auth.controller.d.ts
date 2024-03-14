import { Response } from "express";
import { EmployeeService } from "../employee/employee.service";
import { AuthLoginDTO } from "./auth.dto/auth-login.dto";
export declare class AuthController {
    private employeeService;
    constructor(employeeService: EmployeeService);
    login(authLoginDTO: AuthLoginDTO, res: Response): Promise<any>;
}
