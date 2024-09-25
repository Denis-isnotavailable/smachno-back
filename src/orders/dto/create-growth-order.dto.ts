import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ItemsOrderDto } from './items-order.dto';

export class CreateGrowthOrderDto {
 @IsOptional()
 @ApiProperty({ example: 'Напис на табличці', description: 'Напис на табличці', required: false })
 plate: string;

 @Type(() => ItemsOrderDto)
 @ValidateNested()
 @ApiProperty({ type: [ItemsOrderDto], description: 'Список товарів' })
 items: ItemsOrderDto[];
}
