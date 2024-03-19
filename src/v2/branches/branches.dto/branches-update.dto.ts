import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";
import { IsNotEmptyString } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { UtilsBaseExceptionLangValidator } from "src/utils.common/utils.exception.lang.common/utils.base.exception.lang.validator";
export class BrancheUpdateDTO {
  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionName("Chi nhánh"),
  })
  @IsNotEmptyString()
  @Length(1, 255)
  readonly name: string;
}
