import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Tables } from "./tables.entity/tables.entity";
import { TableCreateDTO } from "./tables.dto/table-create.dto";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils.store-procedure-result.common";
import { TableUpdateDTO } from "./tables.dto/table-update.dto";

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Tables)
    private tablesRepository: Repository<Tables>
  ) {}

  async findWithId(tableId: number, employeeId: number): Promise<Tables> {
    let existingTable: any = await this.tablesRepository.query(
      `
        CALL sp_g_table(?, ?, @c, @m);
        SELECT @c AS status, @m AS message;
      `,
      [employeeId, tableId]
    );

    return new StoreProcedureResult<Tables>().getResultDetail(existingTable);
  }

  async create(employeeId: number, table: TableCreateDTO): Promise<Tables> {
    let savedTable: any = await this.tablesRepository.query(
      `
      CALL sp_u_table_create(?, ?, @c, @m);
      SELECT @c AS status, @m AS message;
      `,
      [employeeId, JSON.stringify(table)]
    );

    return new StoreProcedureResult<Tables>().getResultDetail(savedTable);
  }

  async createMulti(
    employeeId: number,
    tables: TableCreateDTO[]
  ): Promise<Tables[]> {
    let savedTables: any = await this.tablesRepository.query(
      `
      CALL sp_u_tables_create(?, ?, @c, @m);
      SELECT @c AS status, @m AS message;
      `,
      [employeeId, JSON.stringify(tables)]
    );

    return new StoreProcedureResult<Tables>().getResultList(savedTables);
  }

  async update(
    employeeId: number,
    tableId: number,
    tableData: TableUpdateDTO
  ): Promise<Tables> {
    let updatedTable: any = await this.tablesRepository.query(
      `
        CALL sp_u_table_name(?, ?, ?, @c, @m);
        SELECT @c AS status, @m AS message;
      `,
      [employeeId, tableId, JSON.stringify(tableData)]
    );

    return new StoreProcedureResult<Tables>().getResultDetail(updatedTable);
  }

  async findAll(employeeId: number): Promise<Tables[]> {
    let existingTables = await this.tablesRepository.query(
      `
        CALL sp_g_tables(?, @c, @m);
        SELECT @c AS status, @m AS message;
      `,
      [employeeId]
    );

    return new StoreProcedureResult<Tables>().getResultList(existingTables);
  }
}
