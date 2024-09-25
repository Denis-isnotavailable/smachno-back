import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ItemsOrderDto } from './items-order.dto';

export class CreateZsuOrderDto {
 @Type(() => ItemsOrderDto)
 @ValidateNested()
 @ApiProperty({ type: [ItemsOrderDto], description: 'Список товарів' })
 items: ItemsOrderDto[];
}
