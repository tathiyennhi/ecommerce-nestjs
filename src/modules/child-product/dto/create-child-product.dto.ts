import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateChildProductDto {
    @IsString()
    name: string;

    @IsNumberString()
    price: number;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsNumberString()
    quantity: number;

    @IsString()
    productId: string;
}
