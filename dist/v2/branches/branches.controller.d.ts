import { Response } from "express";
import { Employee } from "../employee/employee.entity/employee.entity";
import { BranchesService } from "./branches.service";
import { BrancheDTO } from "./branches.dto/branches-create.dto";
import { BrancheUpdateDTO } from "./branches.dto/branches-update.dto";
export declare class BranchesController {
    private branchesService;
    constructor(branchesService: BranchesService);
    create(branchesDTO: BrancheDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    createMulti(branchesDTO: BrancheDTO[], res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    updateBrand(branchesUpdateDTO: BrancheUpdateDTO, res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
    brancheDetail(id: number, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    branches(res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
}
