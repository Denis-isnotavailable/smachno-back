import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
 @ApiProperty({ example: 'password', description: 'Попередній пароль користувача', required: true })
 @IsNotEmpty()
 @MinLength(8, { message: 'Password must be more then 8 symbols' })
 @MaxLength(50, { message: 'Password must be less then 50 symbols' })
 password: string;

 @ApiProperty({ example: 'password', description: 'Новий пароль користувача', required: true })
 @IsNotEmpty()
 @MinLength(8, { message: 'Password must be more then 8 symbols' })
 @MaxLength(50, { message: 'Password must be less then 50 symbols' })
 newPassword: string;
}
