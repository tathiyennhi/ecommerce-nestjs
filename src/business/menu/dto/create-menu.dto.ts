import { IsString } from 'class-validator';

export class CreateMenuDto {
//   @IsString()
//   id: string;

  @IsString()
  name: string;
}
