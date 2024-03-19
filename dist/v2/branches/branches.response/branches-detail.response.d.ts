import { Branches } from "../branches.entity/branches.entity";
export declare class BrancheDetailResponse {
    id: number;
    name: string;
    status: number;
    created_at: Date;
    constructor(branche?: Branches);
}
