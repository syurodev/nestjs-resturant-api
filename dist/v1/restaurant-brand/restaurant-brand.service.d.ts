import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";
import { Repository } from "typeorm";
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";
export declare class RestaurantBrandService {
    private restaurantBrandRepository;
    constructor(restaurantBrandRepository: Repository<RestaurantBrand>);
    findWithRestaurantIdAndName(restaurantId: number, brandName: string): Promise<RestaurantBrand>;
    findNameArray(restaurantIds: number[], names: string[]): Promise<RestaurantBrand[]>;
    findRestaurantBrandWithId(brandId: number, employeeId: number): Promise<RestaurantBrand>;
    create(employeeId: number, restaurantBrand: RestaurantBrandDTO | RestaurantBrandDTO[]): Promise<RestaurantBrand | RestaurantBrand[]>;
    update(restaurantBrand: RestaurantBrand): Promise<RestaurantBrand>;
    findAll(employeeId: number): Promise<RestaurantBrand[]>;
}
