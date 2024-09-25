import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
 @ApiPropertyOptional({ example: 'Батат', description: 'Нова назва продукту' })
 @IsOptional()
 name?: string;

 @ApiPropertyOptional({
  example: 'Батат - це дуже смачна картопля',
  description: 'Новий опис продукту',
 })
 @IsOptional()
 description?: string;

 @ApiPropertyOptional({
  example: 'Тут має бути іконка продукту',
  description: 'Завантажує іконку продукту',
 })
 productIcon?: string;

 @IsOptional()
 iconPublicId?: string;

 @ApiPropertyOptional({
  example: 'Тут має бути картинка продукту',
  description: 'Завантажує картинку продукту',
 })
 @IsOptional()
 productImage?: string;

 @IsOptional()
 imagePublicId?: string;

 @ApiPropertyOptional({
  example: 100,
  description: 'Ціна',
 })
 @IsOptional()
 @Min(1, { message: 'Ціна повинна бути більше нуля' })
 @IsInt()
 @Type(() => Number)
 price?: number;

 @ApiPropertyOptional({
  example: 'упаковка',
  description: 'Фасування',
 })
 @IsOptional()
 packaging?: string;

 @ApiPropertyOptional({
  example: '2021-01-01',
  description: 'Дата початку сезону',
 })
 @IsOptional()
 @Type(() => Date)
 seasonStart?: Date;

 @ApiPropertyOptional({
  example: '2021-01-01',
  description: 'Дата кінця сезону',
 })
 @IsOptional()
 @Type(() => Date)
 seasonEnd?: Date;

 @ApiPropertyOptional({
  example: 10,
  description: 'Мінімальна вага',
 })
 @IsOptional()
 @Type(() => Number)
 weightMin?: number;

 @ApiPropertyOptional({
  example: 20,
  description: 'Максимальна вага',
 })
 @IsOptional()
 @Type(() => Number)
 weightMax?: number;

 @ApiPropertyOptional({
  example: 'кг/шт/упаковка',
  description: 'Одиниці виміру',
 })
 @IsOptional()
 unit?: string;

 @ApiPropertyOptional({
  example: 10,
  description: 'Висота',
 })
 @IsOptional()
 @Type(() => Number)
 dimensionsHeight?: number;

 @ApiPropertyOptional({
  example: 10,
  description: 'Ширина',
 })
 @IsOptional()
 @Type(() => Number)
 dimensionsWidth?: number;

 @ApiPropertyOptional({
  example: 10,
  description: 'Довжина',
 })
 @IsOptional()
 @Type(() => Number)
 dimensionsLength?: number;

 @ApiPropertyOptional({
  example: true,
  description: 'Можливість доставки',
 })
 @IsOptional()
 shipping?: boolean;

 @ApiPropertyOptional({
  example: true,
  description: 'Готовність до замовлення для росту',
 })
 @IsOptional()
 isReadyToOrderForGrowth?: boolean;

 @ApiPropertyOptional({
  example: true,
  description: 'Чи зараз в продажу',
 })
 @IsOptional()
 isNowInSell?: boolean;
}
