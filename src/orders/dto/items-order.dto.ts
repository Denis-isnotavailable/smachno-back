import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ItemsOrderDto {
 @IsInt()
 @IsPositive()
 @ApiProperty({ example: 1, description: 'Кількість замовлення' })
 order_quantity: number;

 @IsOptional()
 @IsString()
 @ApiProperty({ example: 'Шаблон', description: 'Напис на табличці', required: false })
 plate: string;

 @IsInt()
 @IsPositive()
 @ApiProperty({ example: 1, description: 'ID продукту' })
 productId: number;
}
