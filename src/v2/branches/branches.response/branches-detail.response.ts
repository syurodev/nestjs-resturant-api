import { ApiProperty } from "@nestjs/swagger";
import { Branches } from "../branches.entity/branches.entity";

export class BrancheDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của chi nhánh",
  })
  id: number;
  name: string;
  status: number;
  created_at: Date;

  constructor(branche?: Branches) {
    this.id = branche.id;
    this.name = branche.name;
    this.status = branche.status;
    this.created_at = branche.created_at;
  }
}
