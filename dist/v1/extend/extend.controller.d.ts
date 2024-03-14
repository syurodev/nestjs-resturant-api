import { ExtendService } from "./extend.service";
import { Employee } from "../employee/employee.entity/employee.entity";
import { Response } from "express";
export declare class ExtendController {
    private extendService;
    constructor(extendService: ExtendService);
    getRestaurantDetail(employee: Employee, res: Response, query: {
        status?: number;
    }): Promise<Response<any, Record<string, any>>>;
}
