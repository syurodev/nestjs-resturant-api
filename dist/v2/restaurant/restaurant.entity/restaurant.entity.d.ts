import { BaseEntity } from "typeorm";
export declare class Restaurant extends BaseEntity {
    id: number;
    employee_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
}
