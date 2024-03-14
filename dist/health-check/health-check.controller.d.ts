import { Response } from "express";
export declare class HealthCheckController {
    healthCheck(res: Response): Response<any, Record<string, any>>;
}
