import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Tables } from "./tables.entity/tables.entity";
import { TableCreateDTO } from "./tables.dto/table-create.dto";

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Tables)
    private tablesRepository: Repository<Tables>
  ) { };

  async findWithName(
    restaurantId: number,
    restaurantBrandId: number,
    areaId: number,
    tableName: string
  ): Promise<Tables> {
    return await this.tablesRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        restaurant_brand_id: restaurantBrandId,
        area_id: areaId,
        name: tableName
      }
    });
  }

  async findNameArray(
    restaurantIds: number[],
    restaurantBrandIds: number[],
    areaIds: number[],
    names: string[]
  ): Promise<Tables[]> {
    return await this.tablesRepository.findBy({
      restaurant_id: In(restaurantIds),
      restaurant_brand_id: In(restaurantBrandIds),
      area_id: In(areaIds),
      name: In(names)
    });
  };

  async findWithId(tableId: number, employeeId: number): Promise<Tables> {
    return await this.tablesRepository.findOneBy({
      id: tableId,
      employee_id: employeeId
    });
  }

  async create(employeeId: number, table: TableCreateDTO | TableCreateDTO[]): Promise<Tables | Tables[]> {
    let data
    if (Array.isArray(table)) {
      data = table.map((item) => ({
        ...item,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    } else {
      data = {
        ...table,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    };

    return await this.tablesRepository.save(data);
  }

  async update(table: Tables): Promise<Tables> {
    return await this.tablesRepository.save(table)
  }

  async findAll(employeeId: number): Promise<Tables[]> {
    return await this.tablesRepository.findBy({ employee_id: employeeId })
  }
}