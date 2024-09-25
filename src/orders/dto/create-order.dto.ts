import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { MonopayDto } from 'src/monopay/dto/monopay.dto';
import { CreateGrowthOrderDto } from './create-growth-order.dto';
import { CreateSelfOrderDto } from './create-self-order.dto';
import { CreateZsuOrderDto } from './create-zsu-order.dto';
import { ShippingDto } from './shipping.dto';

export class CreateOrderDto {
 @Type(() => ShippingDto)
 @ValidateNested()
 @IsNotEmpty()
 @ApiProperty({ type: ShippingDto, description: 'Адреса доставки' })
 shippingAddress: ShippingDto;

 @IsOptional()
 @Type(() => CreateGrowthOrderDto)
 @ValidateNested()
 @ApiProperty({ type: CreateGrowthOrderDto, description: 'Замовлення на ріст', required: false })
 growthOrder?: CreateGrowthOrderDto;

 @IsOptional()
 @Type(() => CreateSelfOrderDto)
 @ValidateNested()
 @ApiProperty({ type: CreateSelfOrderDto, description: 'Самовивіз', required: false })
 selfOrder?: CreateSelfOrderDto;

 @IsOptional()
 @Type(() => CreateZsuOrderDto)
 @ValidateNested()
 @ApiProperty({ type: CreateZsuOrderDto, description: 'Замовлення для ЗСУ', required: false })
 zsuOrder?: CreateZsuOrderDto;

 @IsOptional()
 @Type(() => MonopayDto)
 @ValidateNested()
 @ApiProperty({ type: MonopayDto, description: 'Деталі платежу', required: false })
 payment_reference?: MonopayDto;

 @IsOptional()
 @ApiProperty({ example: 'PAID', description: 'Статус оплати', required: false })
 statusLiqPay?: string;
}
