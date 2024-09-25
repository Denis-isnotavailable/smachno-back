import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
 @ApiProperty({
  example: 'https://www.facebook.com/100000000000000/posts/0000000000000000/',
  description: 'Посилання на відгук',
 })
 @IsString()
 reviewUrl?: string;

 @ApiProperty({
  example: 'Тут має бути картинка(скріншот нашого відгука)',
  description: 'Завантажує картинку',
 })
 reviewImage?: string;

 @ApiProperty({
  example: 'Тут має бути альтернативний текст відгуку',
  description: 'альтернативний текст відгуку',
 })
 @IsString()
 text?: string;

 @IsString()
 @IsOptional()
 reviewImagePublicId: string;
}
