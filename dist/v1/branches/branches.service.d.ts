import { Repository } from "typeorm";
import { Branches } from "./branches.entity/branches.entity";
import { BrancheDTO } from "./branches.dto/branches-create.dto";
export declare class BranchesService {
    private branchesRepository;
    constructor(branchesRepository: Repository<Branches>);
    findWithName(restaurantId: number, restaurantBrandId: number, brancheName: string): Promise<Branches>;
    findNameArray(restaurantIds: number[], restaurantBrandIds: number[], names: string[]): Promise<Branches[]>;
    findWithId(brancheId: number, employeeId: number): Promise<Branches>;
    create(employeeId: number, branches: BrancheDTO | BrancheDTO[]): Promise<Branches | Branches[]>;
    update(branche: Branches): Promise<Branches>;
    findAll(employeeId: number): Promise<Branches[]>;
}
