import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Branches } from "./branches.entity/branches.entity";
import { BrancheDTO } from "./branches.dto/branches-create.dto";

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branches)
    private branchesRepository: Repository<Branches>
  ) { };

  async findWithName(
    restaurantId: number,
    restaurantBrandId: number,
    brancheName: string
  ): Promise<Branches> {
    return await this.branchesRepository.findOne({
      where: {
        restaurant_id: restaurantId,
        restaurant_brand_id: restaurantBrandId,
        name: brancheName
      }
    });
  };

  async findNameArray(
    restaurantIds: number[],
    restaurantBrandIds: number[],
    names: string[]
  ): Promise<Branches[]> {
    return await this.branchesRepository.findBy({
      restaurant_id: In(restaurantIds),
      restaurant_brand_id: In(restaurantBrandIds),
      name: In(names)
    });
  };

  async findWithId(brancheId: number, employeeId: number): Promise<Branches> {
    return await this.branchesRepository.findOneBy({ id: brancheId, employee_id: employeeId })
  };

  async create(employeeId: number, branches: BrancheDTO | BrancheDTO[]): Promise<Branches | Branches[]> {
    let data
    if (Array.isArray(branches)) {
      data = branches.map((item) => ({
        ...item,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    } else {
      data = {
        ...branches,
        employee_id: employeeId,
        created_at: new Date(),
        updated_at: new Date(),
      }
    }

    return await this.branchesRepository.save(data) as Branches | Branches[]
  };

  async update(branche: Branches): Promise<Branches> {
    return await this.branchesRepository.save(branche);
  };

  async findAll(employeeId: number): Promise<Branches[]> {
    return await this.branchesRepository.findBy({ employee_id: employeeId })
  };
};