import { Repository } from "typeorm";
import { Areas } from "./areas.entity/areas.entity";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
export declare class AreasService {
    private areasRepository;
    constructor(areasRepository: Repository<Areas>);
    findWithName(restaurantId: number, restaurantBrandId: number, branchId: number, brancheName: string): Promise<Areas>;
    findNameArray(restaurantIds: number[], restaurantBrandIds: number[], branchIds: number[], names: string[]): Promise<Areas[]>;
    findWithId(areaId: number, employeeId: number): Promise<Areas>;
    create(employeeId: number, area: AreaCreateDTO | AreaCreateDTO[]): Promise<Areas | Areas[]>;
    update(area: Areas): Promise<Areas>;
    findAll(employee_id: number): Promise<Areas[]>;
}
