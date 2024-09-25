import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
 @ApiProperty()
 id?: number;

 @ApiProperty()
 reviewUrl?: string;

 @ApiProperty()
 reviewImage?: string;

 @ApiProperty()
 text?: string;
}
