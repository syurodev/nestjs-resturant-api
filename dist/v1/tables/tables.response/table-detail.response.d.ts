import { Tables } from "../tables.entity/tables.entity";
export declare class TableDetailResponse {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    constructor(table?: Tables);
}
