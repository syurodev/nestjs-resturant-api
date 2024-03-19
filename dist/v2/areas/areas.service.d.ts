import { Repository } from "typeorm";
import { Areas } from "./areas.entity/areas.entity";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
import { AreaUpdateDTO } from "./areas.dto/area-update.dto";
export declare class AreasService {
    private areasRepository;
    constructor(areasRepository: Repository<Areas>);
    findWithId(areaId: number, employeeId: number): Promise<Areas>;
    create(employeeId: number, area: AreaCreateDTO): Promise<Areas>;
    createMulti(employeeId: number, area: AreaCreateDTO[]): Promise<Areas[]>;
    update(employeeId: number, areaId: number, areaUpdateData: AreaUpdateDTO): Promise<Areas>;
    findAll(employeeId: number): Promise<Areas[]>;
}
