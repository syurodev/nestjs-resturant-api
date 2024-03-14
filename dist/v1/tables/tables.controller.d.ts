import { Response } from "express";
import { Employee } from "../employee/employee.entity/employee.entity";
import { TablesService } from "./tables.service";
import { TableCreateDTO } from "./tables.dto/table-create.dto";
import { TableUpdateDTO } from "./tables.dto/table-update.dto";
export declare class TablesController {
    private tablesService;
    constructor(tablesService: TablesService);
    create(tableCreateDto: TableCreateDTO, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    createMulti(tableCreateDto: TableCreateDTO[], res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    updateBrand(tableUpdateDto: TableUpdateDTO, res: Response, id: number, employee: Employee): Promise<Response<any, Record<string, any>>>;
    brancheDetail(id: number, res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
    branches(res: Response, employee: Employee): Promise<Response<any, Record<string, any>>>;
}
