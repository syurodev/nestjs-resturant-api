import { Response } from "express";
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";
import { Employee } from "../employee/employee.entity/employee.entity";
import { RestaurantBrandService } from "./restaurant-brand.service";
export declare class RestaurantBrandController {
    private restaurantBrandService;
    constructor(restaurantBrandService: RestaurantBrandService);
    create(restaurantBrandDTO: RestaurantBrandDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    createMulti(restaurantBrandDTO: RestaurantBrandDTO[], res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    update(restaurantBrandDTO: RestaurantBrandDTO, res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
    brandDetail(res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
    listBrand(res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
}
