import { IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  displayContent: string;

  @IsString()
  productTypeId: string;

  @IsString()
  fabric: string;

  @IsString()
  code: string;
}
