import { BaseEntity } from "typeorm";
export declare class RestaurantBrand extends BaseEntity {
    id: number;
    employee_id: number;
    restaurant_id: number;
    status: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}
