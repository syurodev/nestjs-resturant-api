import { ApiProperty } from "@nestjs/swagger";
import { Tables } from "../tables.entity/tables.entity";

export class TableDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của bàn",
  })
  id: number;
  name: string;
  status: number;
  created_at: Date;

  constructor(table?: Tables) {
    this.id = table.id;
    this.name = table.name;
    this.status = table.status;
    this.created_at = table.created_at;
  }
}
