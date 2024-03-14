import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tables } from "./tables.entity/tables.entity";
import { TablesService } from "./tables.service";
import { TablesController } from "./tables.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Tables]),
  ],
  providers: [TablesService],
  controllers: [TablesController],
})
export class TablesModule { }
