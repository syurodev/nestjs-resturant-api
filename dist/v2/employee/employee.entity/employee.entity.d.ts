import { BaseEntity } from "typeorm";
export declare class Employee extends BaseEntity {
    id: number;
    username: string;
    full_name: string;
    gender: number;
    birthday: Date;
    phone_number: string;
    password: string;
    access_token: string;
    created_at: Date;
    updated_at: Date;
}
