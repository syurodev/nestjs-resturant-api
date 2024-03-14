import { IsNumber, IsString, Length } from "class-validator";
import { IsNotEmptyString } from "src/utils.common/utils.decorators.common/utils.decorators.common";
export class RestaurantDTO {
  @IsNotEmptyString()
  @Length(1, 255)
  readonly name: string;
}
