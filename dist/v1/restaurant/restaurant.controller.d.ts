import { Response } from "express";
import { Employee } from "../employee/employee.entity/employee.entity";
import { RestaurantDTO } from "./restaurant.dto/restaurant.create.dto";
import { RestaurantService } from "./restaurant.service";
export declare class RestaurantController {
    private restaurantService;
    constructor(restaurantService: RestaurantService);
    create(restaurantDTO: RestaurantDTO, res: Response, employee: Employee): Promise<any>;
    createMulti(restaurantDTO: RestaurantDTO[], res: Response, employee: Employee): Promise<any>;
    getRestaurants(res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    update(restaurantDTO: RestaurantDTO, res: Response, id: number, employee: Employee): Promise<any>;
    restaurantDetail(res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
}
