import { RestaurantBrand } from "../restaurant-brand.entity/restaurant-brand.entity";
export declare class RestaurantBrandsResponse {
    id: number;
    employee_id: number;
    restaurant_id: number;
    name: string;
    created_at: Date;
    constructor(brand?: RestaurantBrand);
    mapToList(list: RestaurantBrand[]): RestaurantBrandsResponse[];
}
