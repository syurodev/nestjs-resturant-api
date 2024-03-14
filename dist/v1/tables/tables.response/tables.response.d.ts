import { Tables } from "../tables.entity/tables.entity";
export declare class TablesResponse {
    id: number;
    employee_id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    area_id: number;
    name: string;
    created_at: Date;
    constructor(table?: Tables);
    mapToList(list: Tables[]): TablesResponse[];
}
