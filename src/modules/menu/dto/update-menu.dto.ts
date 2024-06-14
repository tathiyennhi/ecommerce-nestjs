import { IsString } from "class-validator";

export class UpdateMenuDto {
  @IsString()
  name: string;
}
