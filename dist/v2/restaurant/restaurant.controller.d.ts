import { Response } from "express";
import { Employee } from "../employee/employee.entity/employee.entity";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { RestaurantService } from "./restaurant.service";
export declare class RestaurantController {
    private restaurantService;
    constructor(restaurantService: RestaurantService);
    create(restaurantDTO: RestaurantDTO, res: Response, employee: Employee): Promise<any>;
}
