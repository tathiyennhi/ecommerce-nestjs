import { IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  menuId: string;

  @IsString()
  displayContent: string;

  @IsString()
  description: string;
}
