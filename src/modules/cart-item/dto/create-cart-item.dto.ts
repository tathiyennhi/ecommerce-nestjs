import {
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { IsGreaterThanZero } from "src/common/custom-validators/is-greater-than-zero.validator";

export class CreateCartItemDto {
  @IsString()
  @IsOptional()
  cartId: string;

  @IsString()
  userId: string;

  @IsString()
  childProductId: string;

  // @IsNumberString()
  @IsNumber()
  @IsGreaterThanZero({ message: "Quantity must be greater than 0" })
  quantity: number;
}
