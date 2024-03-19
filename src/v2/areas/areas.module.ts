import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Areas } from "./areas.entity/areas.entity";
import { AreasService } from "./areas.service";
import { AreasController } from "./areas.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Areas]),
  ],
  providers: [AreasService],
  controllers: [AreasController],
})
export class AreasModule { }
