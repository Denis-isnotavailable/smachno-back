import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
 @ApiPropertyOptional({
  example: 'нове посилання на відгук',
  description: 'Оновлене посилання на відгук',
 })
 @IsString()
 @IsOptional()
 reviewUrl?: string;

 @ApiPropertyOptional({
  example: 'Новий текст відгуку',
  description: 'Оновлений текст відгуку',
 })
 @IsString()
 @IsOptional()
 text?: string;

 @ApiPropertyOptional({
  example: 'новий publicId картинки',
  description: 'Оновлений publicId картинки',
 })
 @IsString()
 @IsOptional()
 reviewImagePublicId?: string;
}
