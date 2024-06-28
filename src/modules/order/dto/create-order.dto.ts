import { IsOptional, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    shippingMethod: string;
    
    @IsString()
    userId: string;

    @IsString()
    paymentMethod: string;

    @IsString()
    cartId: string;

    @IsString()
    @IsOptional()
    voucherId: string;
}
