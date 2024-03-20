import { RestaurantBrand } from "../restaurant-brand.entity/restaurant-brand.entity";
export declare class RestaurantBrandDetailResponse {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    constructor(brand?: RestaurantBrand);
}
