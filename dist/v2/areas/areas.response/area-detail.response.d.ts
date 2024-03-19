import { Areas } from "../areas.entity/areas.entity";
export declare class AreaDetailResponse {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    constructor(area?: Areas);
}
