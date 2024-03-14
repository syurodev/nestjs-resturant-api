import { Response } from "express";
import { Employee } from "../employee/employee.entity/employee.entity";
import { AreasService } from "./areas.service";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
import { AreaUpdateDTO } from "./areas.dto/area-update.dto";
export declare class AreasController {
    private areasService;
    constructor(areasService: AreasService);
    create(areaCreateDto: AreaCreateDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    createMulti(areaCreateDto: AreaCreateDTO[], res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    updateBrand(branchesUpdateDTO: AreaUpdateDTO, res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
    brancheDetail(id: number, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    branches(res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
}
