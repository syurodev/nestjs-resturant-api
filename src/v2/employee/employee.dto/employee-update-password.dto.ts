import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmptyString } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { UtilsBaseExceptionLangValidator } from "src/utils.common/utils.exception.lang.common/utils.base.exception.lang.validator";
export class EmployeeUpdatePasswordDTO {
  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionPassword(),
  })
  @IsNotEmptyString()
  readonly old_password: string;

  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionPassword(),
  })
  @IsNotEmptyString()
  readonly new_password: string;
}
