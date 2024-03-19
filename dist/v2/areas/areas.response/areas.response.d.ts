import { Areas } from "../areas.entity/areas.entity";
export declare class AreasResponse {
    id: number;
    employee_id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    branch_id: number;
    name: string;
    created_at: Date;
    constructor(areas?: Areas);
    mapToList(list: Areas[]): AreasResponse[];
}
