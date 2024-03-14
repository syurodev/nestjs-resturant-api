import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Areas } from "./areas.entity/areas.entity";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private areasRepository: Repository<Areas>
  ) { };

  async findWithName(
    restaurantId: number,
    restaurantBrandId: number,
    branchId: number,
    brancheName: string
  ): Promise<Areas> {
    return await this.areasRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        restaurant_brand_id: restaurantBrandId,
        branch_id: branchId,
        name: brancheName
      }
    });
  }

  async findNameArray(
    restaurantIds: number[],
    restaurantBrandIds: number[],
    branchIds: number[],
    names: string[]
  ): Promise<Areas[]> {
    return await this.areasRepository.findBy({
      restaurant_id: In(restaurantIds),
      restaurant_brand_id: In(restaurantBrandIds),
      branch_id: In(branchIds),
      name: In(names)
    });
  }

  async findWithId(areaId: number, employeeId: number): Promise<Areas> {
    return await this.areasRepository.findOneBy({ id: areaId, employee_id: employeeId });
  }

  async create(employeeId: number, area: AreaCreateDTO | AreaCreateDTO[]): Promise<Areas | Areas[]> {
    let data;
    if (Array.isArray(area)) {
      data = area.map((item) => ({
        ...item,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    } else {
      data = {
        ...area,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    };
    return await this.areasRepository.save(data) as Areas | Areas[];
  }

  async update(area: Areas): Promise<Areas> {
    return await this.areasRepository.save(area);
  }

  async findAll(employee_id: number): Promise<Areas[]> {
    return await this.areasRepository.findBy({ employee_id: employee_id });
  }
}