import { ApiProperty } from "@nestjs/swagger";
import { Areas } from "../areas.entity/areas.entity";

export class AreaDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của khu vực",
  })

  area: Areas;

  constructor(area?: Areas) {
    this.area = area
  };

}
