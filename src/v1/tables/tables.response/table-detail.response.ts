import { ApiProperty } from "@nestjs/swagger";
import { Tables } from "../tables.entity/tables.entity";

export class TableDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của bàn",
  })

  table: Tables;

  constructor(table?: Tables) {
    this.table = table
  };

}
