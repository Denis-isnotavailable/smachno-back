import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
 id: number;

 @ApiProperty({ example: 'Батат', description: 'Назва продукту', required: true })
 @IsNotEmpty()
 // @IsString()
 name: string;

 @ApiProperty({
  example: 'Батат - це дуже смачна картопля',
  description: 'Опис продукту',
  required: false,
 })
 @IsNotEmpty()
 // @IsString()
 description: string;

 @ApiProperty({
  example: 'Тут має бути іконка продукту',
  description: 'Завантажує іконку продукту',
  required: true,
 })
 productIcon?: string;

 // @IsString()
 iconPublicId?: string;

 @ApiProperty({
  example: 'Тут має бути картинка продукту',
  description: 'Завантажує картинку продукту',
  required: true,
 })
 productImage?: string;

 // @IsString()
 imagePublicId?: string;

 @ApiProperty({
  example: 100,
  description: 'Ціна',
  required: true,
 })
 @IsNotEmpty()
 price: number;

 @ApiProperty({
  example: 'упаковка',
  description: 'Фасування',
  required: true,
 })
 // @IsString()
 packaging: string;

 @ApiProperty({
  example: '2021-01-01',
  description: 'Дата початку сезону',
  required: true,
 })
 // @IsDate()
 seasonStart: Date;

 @ApiProperty({
  example: '2021-01-01',
  description: 'Дата кінця сезону',
  required: true,
 })
 // @IsDate()
 seasonEnd: Date;

 @ApiProperty({
  example: 10,
  description: 'Мінімальна вага',
  required: true,
 })
 // @IsNumber()
 weightMin: number;

 @ApiProperty({
  example: 20,
  description: 'Максимальна вага',
  required: true,
 })
 // @IsNumber()
 weightMax: number;

 @ApiProperty({
  example: 'кг/шт/упаковка',
  description: 'Одиниці виміру',
  required: true,
 })
 @IsNotEmpty()
 // @IsString()
 unit: string;

 @ApiProperty({
  example: 10,
  description: 'Висота',
  required: false,
 })
 dimensionsHeight?: number;

 @ApiProperty({
  example: 10,
  description: 'Ширина',
  required: false,
 })
 dimensionsWidth?: number;

 @ApiProperty({
  example: 10,
  description: 'Довжина',
  required: false,
 })
 dimensionsLength?: number;

 @ApiProperty({
  example: true,
  description: 'Можливість доставки',
  required: true,
 })
 // @IsBoolean()
 shipping: boolean;

 // @IsBoolean()
 // @IsOptional()
 @ApiProperty({
  example: true,
  description: 'Готовність до замовлення для росту',
  required: false,
 })
 isReadyToOrderForGrowth?: boolean;

 // @IsBoolean()
 // @IsOptional()
 @ApiProperty({
  example: true,
  description: 'Чи зараз в продажу',
  required: false,
 })
 isNowInSell?: boolean;

 @ApiProperty()
 createdAt: Date;

 @ApiProperty()
 updatedAt: Date;
}
