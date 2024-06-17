import { IsNumber, IsString } from "class-validator";

export class CreateChildProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    color: string;

    @IsString()
    size: string;

    @IsNumber()
    quantity: number;

    @IsString()
    productId: string;
}
