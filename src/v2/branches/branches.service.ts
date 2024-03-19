import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Branches } from "./branches.entity/branches.entity";
import { BrancheDTO } from "./branches.dto/branches-create.dto";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branches)
    private branchesRepository: Repository<Branches>
  ) {}

  async findWithId(brancheId: number, employeeId: number): Promise<Branches> {
    let existingBranche: any = await this.branchesRepository.query(
      `
        CALL sp_g_branche(?, ?, ?, @c, @m)
        SELECT @c as status, @m as message;
      `,
      [employeeId, brancheId]
    );
    return new StoreProcedureResult<Branches>().getResultDetail(
      existingBranche
    );
  }

  async create(employeeId: number, branches: BrancheDTO): Promise<Branches> {
    let createdBranche: any = await this.branchesRepository.query(
      `
          CALL sp_u_branche_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId, JSON.stringify(branches)]
    );
    return new StoreProcedureResult<Branches>().getResultDetail(createdBranche);
  }

  async createMulti(
    employeeId: number,
    branches: BrancheDTO[]
  ): Promise<Branches[]> {
    let createdBranches: any = await this.branchesRepository.query(
      `
          CALL sp_u_branches_create(?, ?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId, JSON.stringify(branches)]
    );
    return new StoreProcedureResult<Branches>().getResultList(createdBranches);
  }

  async update(
    employeeId: number,
    brancheId: number,
    branche: string
  ): Promise<Branches> {
    let updatedBranche: any = await this.branchesRepository.query(
      `
        CALL sp_u_branche(?, ?, ?, @c, @m);
        SELECT @c as status, @m as message;
      `,
      [employeeId, brancheId, branche]
    );

    return new StoreProcedureResult<Branches>().getResultDetail(updatedBranche);
  }

  async findAll(employeeId: number): Promise<Branches[]> {
    let branches: any = await this.branchesRepository.query(
      `
          CALL sp_g_branches(?, @c, @m);
          SELECT @c as status, @m as message;
        `,
      [employeeId]
    );

    return new StoreProcedureResult<Branches>().getResultList(branches);
  }
}
