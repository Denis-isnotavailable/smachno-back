import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsEnum, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../../enums/order.constans';

export class PageOptionsDto {
 @ApiPropertyOptional({ enum: Order, default: Order.ASC })
 @IsEnum(Order)
 @IsOptional()
 readonly order: Order = Order.ASC;

 @ApiPropertyOptional({
  default: 1,
  minimum: 1,
 })
 @Type(() => Number)
 @IsInt()
 @Min(1)
 @IsOptional()
 readonly page: number = 1;

 @ApiPropertyOptional({
  default: 10,
  minimum: 1,
  maximum: 10000,
 })
 @Type(() => Number)
 @IsInt()
 @Min(1)
 @Max(50)
 @IsOptional()
 readonly take?: number = 10;

 get skip() {
  return (this.page - 1) * this.take;
 }
}
