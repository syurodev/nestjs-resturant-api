import { Repository } from "typeorm";
import { Branches } from "./branches.entity/branches.entity";
import { BrancheDTO } from "./branches.dto/branches-create.dto";
export declare class BranchesService {
    private branchesRepository;
    constructor(branchesRepository: Repository<Branches>);
    findWithId(brancheId: number, employeeId: number): Promise<Branches>;
    create(employeeId: number, branches: BrancheDTO): Promise<Branches>;
    createMulti(employeeId: number, branches: BrancheDTO[]): Promise<Branches[]>;
    update(employeeId: number, brancheId: number, branche: string): Promise<Branches>;
    findAll(employeeId: number): Promise<Branches[]>;
}
