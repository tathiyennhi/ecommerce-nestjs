import { IsNumber } from "class-validator";
import { IsGreaterThanZero } from "src/common/custom-validators/is-greater-than-zero.validator";

export class GetProductDto {
  @IsNumber()
  @IsGreaterThanZero()
  page: number;

  @IsNumber()
  @IsGreaterThanZero()
  itemPerPage: number;
}
