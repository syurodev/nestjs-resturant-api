import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { EmployeeService } from "src/v1/employee/employee.service";
export declare class AuthenticationMiddleware implements NestMiddleware {
    private readonly employeeService;
    private validateTokenService;
    constructor(employeeService: EmployeeService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
