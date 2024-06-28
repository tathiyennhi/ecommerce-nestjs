import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsGreaterOrEqualThanZero } from "src/common/custom-validators/is-greater-equal-than-zero.validator";

export class UpdateCartItemDto {
  @IsString()
  @IsOptional()
  cartId: string;

  @IsString()
  userId: string;

  @IsString()
  childProductId: string;

  // @IsNumberString()
  @IsNumber()
  @IsGreaterOrEqualThanZero({ message: "Quantity must be greater or equal 0" })
  quantity: number;
}
