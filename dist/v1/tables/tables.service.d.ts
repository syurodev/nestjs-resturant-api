import { Repository } from "typeorm";
import { Tables } from "./tables.entity/tables.entity";
import { TableCreateDTO } from "./tables.dto/table-create.dto";
export declare class TablesService {
    private tablesRepository;
    constructor(tablesRepository: Repository<Tables>);
    findWithName(restaurantId: number, restaurantBrandId: number, areaId: number, tableName: string): Promise<Tables>;
    findNameArray(restaurantIds: number[], restaurantBrandIds: number[], areaIds: number[], names: string[]): Promise<Tables[]>;
    findWithId(tableId: number, employeeId: number): Promise<Tables>;
    create(employeeId: number, table: TableCreateDTO | TableCreateDTO[]): Promise<Tables | Tables[]>;
    update(table: Tables): Promise<Tables>;
    findAll(employeeId: number): Promise<Tables[]>;
}
