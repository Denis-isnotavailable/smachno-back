import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

enum TypeOrder {
 zsuOrder = 'zsuOrder',
 selfOrder = 'selfOrder',
 growthOrder = 'growthOrder',
}
export class UpdateStatusOrderDto {
 @ApiProperty({ example: 'zsuOrder', description: 'тип замовлення', required: true })
 @IsNotEmpty()
 @IsEnum(TypeOrder)
 typeOrder: TypeOrder;

 @ApiProperty({ example: '2', description: 'номер замовлення по типу', required: true })
 @IsNotEmpty()
 @IsNumber()
 idOrder: number;

 @ApiProperty({ example: '5', description: 'номер продукту у замовленні', required: true })
 @IsNotEmpty()
 @IsNumber()
 idItemOrder: number;

 @ApiProperty({ example: true, description: 'статус', required: true })
 @IsNotEmpty()
 @IsBoolean({ message: 'status must be a boolean' })
 status: boolean;
}
