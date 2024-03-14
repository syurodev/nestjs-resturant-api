import { ApiProperty } from "@nestjs/swagger";
import { Branches } from "../branches.entity/branches.entity";

export class BrancheDetailResponse {
  @ApiProperty({
    default: "",
    example: "",
    description: "thông tin của chi nhánh",
  })

  branche: Branches;

  constructor(branche?: Branches) {
    this.branche = branche
  };

}
