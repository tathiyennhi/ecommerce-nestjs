import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsString } from 'class-validator';

export class UpdateCartDto {
    @IsString()
    cartId: string;

    @IsString()
    status: string;
}
