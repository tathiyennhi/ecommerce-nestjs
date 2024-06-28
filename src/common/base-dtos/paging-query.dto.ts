import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PagingQueryDto {
//   @IsOptional()
  @IsInt()
  @Type(() => Number) // Convert query parameter from string to number
  @Min(1, { message: 'Page number must be at least 1' })
//   page?: number; // tooi khong thich optional
  page: number;

//   @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1, { message: 'Items per page must be at least 1' })
//   itemPerPage?: number;
  itemsPerPage: number;
}
