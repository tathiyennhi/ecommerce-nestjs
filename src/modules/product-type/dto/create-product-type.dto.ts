import { IsString } from "class-validator";

export class CreateProductTypeDto {
  @IsString()
  displayContent: string;

  @IsString()
  description: string;

  @IsString()
  categoryId: string;
}
