import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Areas } from "./areas.entity/areas.entity";
import { AreaCreateDTO } from "./areas.dto/area-create.dto";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";
import { AreaUpdateDTO } from "./areas.dto/area-update.dto";

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private areasRepository: Repository<Areas>
  ) {}
  async findWithId(areaId: number, employeeId: number): Promise<Areas> {
    let existingArea: any = await this.areasRepository.query(
      `
        CALL sp_g_area(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId, areaId]
    );
    return new StoreProcedureResult<Areas>().getResultDetail(existingArea);
  }

  async create(employeeId: number, area: AreaCreateDTO): Promise<Areas> {
    let createdArea = await this.areasRepository.query(
      `
        CALL sp_u_area_create(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId, JSON.stringify(area)]
    );

    return new StoreProcedureResult<Areas>().getResultDetail(createdArea);
  }

  async createMulti(
    employeeId: number,
    area: AreaCreateDTO[]
  ): Promise<Areas[]> {
    let createdAreas = await this.areasRepository.query(
      `
        CALL sp_u_areas_create(?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId, JSON.stringify(area)]
    );

    return new StoreProcedureResult<Areas>().getResultList(createdAreas);
  }

  async update(
    employeeId: number,
    areaId: number,
    areaUpdateData: AreaUpdateDTO
  ): Promise<Areas> {
    let updatedArea: any = await this.areasRepository.query(
      `
        CALL sp_u_area_name(?, ?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId, areaId, JSON.stringify(areaUpdateData)]
    );

    return new StoreProcedureResult<Areas>().getResultDetail(updatedArea);
  }

  async findAll(employeeId: number): Promise<Areas[]> {
    let existingAreas: any = await this.areasRepository.query(
      `
        CALL sp_g_areas(?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId]
    );

    return new StoreProcedureResult<Areas>().getResultList(existingAreas);
  }
}
