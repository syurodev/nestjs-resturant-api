import { ApiProperty } from "@nestjs/swagger";
import { Areas } from "../areas.entity/areas.entity";

export class AreaDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của khu vực",
  })
  id: number;
  name: string;
  status: number;
  created_at: Date;

  constructor(area?: Areas) {
    this.id = area.id;
    this.name = area.name;
    this.status = area.status;
    this.created_at = area.created_at;
  }
}
