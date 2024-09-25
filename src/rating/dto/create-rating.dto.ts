import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
 @ApiProperty({ example: 5, description: 'Рейтинг від 1 до 5', required: true })
 @IsInt()
 @Min(1)
 @Max(5)
 rating: number;
}
