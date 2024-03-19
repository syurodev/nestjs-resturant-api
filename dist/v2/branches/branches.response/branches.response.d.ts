import { Branches } from "../branches.entity/branches.entity";
export declare class BranchesResponse {
    id: number;
    employee_id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    name: string;
    created_at: Date;
    constructor(branches?: Branches);
    mapToList(list: Branches[]): Branches[];
}
