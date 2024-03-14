import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { IsNotEmptyString } from "src/utils.common/utils.decorators.common/utils.decorators.common";
import { UtilsBaseExceptionLangValidator } from "src/utils.common/utils.exception.lang.common/utils.base.exception.lang.validator";
export class BrancheDTO {
  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionName("Chi nhánh"),
  })
  @IsNotEmptyString()
  @Length(1, 255)
  readonly name: string;

  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionName("Nhà hàng"),
  })
  @IsNotEmpty()
  readonly restaurant_id: number;

  @ApiProperty({
    required: false,
    example: -1,
    description: UtilsBaseExceptionLangValidator.exceptionName("Thương hiệu"),
  })
  @IsNotEmpty()
  readonly restaurant_brand_id: number;
}
