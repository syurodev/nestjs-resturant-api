import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { UtilsBaseExceptionLangValidator } from "src/utils.common/utils.exception.lang.common/utils.base.exception.lang.validator";
export class EmployeeUpdateStatusDTO {
  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionPassword(),
  })
  @IsNotEmpty()
  readonly status: number;
}
