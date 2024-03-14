import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Branches } from "./branches.entity/branches.entity";
import { BranchesService } from "./branches.service";
import { BranchesController } from "./branches.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Branches]),
  ],
  providers: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule { }
