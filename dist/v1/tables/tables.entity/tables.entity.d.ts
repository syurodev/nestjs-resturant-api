import { BaseEntity } from "typeorm";
export declare class Tables extends BaseEntity {
    id: number;
    employee_id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    area_id: number;
    status: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}
