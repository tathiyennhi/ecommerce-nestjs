import { PartialType } from '@nestjs/mapped-types';
import { CreateChildProductDto } from './create-child-product.dto';

export class UpdateChildProductDto extends PartialType(CreateChildProductDto) {}
