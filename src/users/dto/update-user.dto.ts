import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
 @ApiProperty({ example: 'email@mail.com', description: 'Емейл користувача', required: true })
 @IsEmail()
 @IsOptional()
 email?: string;

 @ApiProperty({ example: 'password', description: 'Пароль користувача', required: true })
 @MinLength(6, { message: 'Password must be more then 6 symbols' })
 @IsOptional()
 password?: string;

 @ApiProperty({ example: 'Name', description: "Ім'я користувача", required: true })
 @MinLength(2, { message: 'firstName must be more then 2 symbols' })
 @IsString({ message: 'Name must be a string' })
 @IsOptional()
 name?: string;

 @ApiProperty({ example: 'Surname', description: 'Прізвище користувача', required: true })
 @IsString({ message: 'Surname must be a string' })
 @MinLength(2, { message: 'Surname must be more then 2 symbols' })
 @IsOptional()
 surname?: string;

 @ApiProperty({ example: '380501112233', description: 'Телефон користувача', required: true })
 @IsPhoneNumber(null, { message: 'Invalid Ukrainian phone number' })
 @IsOptional()
 phone?: string;

 @ApiProperty({ example: 'Telegram', description: 'Месенджер користувача' })
 @IsString({ message: 'Messenger must be a string' })
 @IsOptional()
 messenger?: string;

 @ApiProperty({ example: true, description: 'Приймаємо розсилку' })
 @IsOptional()
 @IsBoolean({ message: 'IsGetEmail must be a boolean' })
 isGetEmail?: boolean;

 @ApiProperty({ example: '2024-04-09T05:56:22.615Z', description: 'Час встановлення тимчасового паролю' })
 @IsOptional()
 @IsBoolean({ message: 'datePassword must string' })
 datePassword: string;
}
