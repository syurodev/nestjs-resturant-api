import { RestaurantBrand } from "./restaurant-brand.entity/restaurant-brand.entity";
import { Repository } from "typeorm";
import { RestaurantBrandDTO } from "./restaurant-brand.dto/restaurant-brand.create.dto";
export declare class RestaurantBrandService {
    private restaurantBrandRepository;
    constructor(restaurantBrandRepository: Repository<RestaurantBrand>);
    findRestaurantBrandWithId(brandId: number, employeeId: number): Promise<RestaurantBrand>;
    create(employeeId: number, restaurantBrand: RestaurantBrandDTO): Promise<RestaurantBrand>;
    createMulti(employeeId: number, restaurantBrands: RestaurantBrandDTO[]): Promise<any>;
    update(employeeId: number, restaurantBrandId: number, restaurantBrandUpdateDTO: RestaurantBrandDTO): Promise<RestaurantBrand>;
    findAll(employeeId: number): Promise<RestaurantBrand[]>;
}
