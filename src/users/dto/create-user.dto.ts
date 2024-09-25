import { ApiProperty } from '@nestjs/swagger';
import {
 IsBoolean,
 IsEmail,
 IsNotEmpty,
 IsOptional,
 IsPhoneNumber,
 isPhoneNumber,
 IsString,
 Matches,
 MaxLength,
 MinLength,
} from 'class-validator';

export class CreateUserDto {
 @ApiProperty({ example: 'email@mail.com', description: 'Емейл користувача', required: true })
 @IsEmail()
 email: string;

 @ApiProperty({ example: 'password', description: 'Пароль користувача', required: true })
 @MinLength(8, { message: 'Password must be more then 8 symbols' })
 @MaxLength(50, { message: 'Password must be less then 50 symbols' })
 password: string;

 @ApiProperty({ example: 'Name', description: "Ім'я користувача", required: true })
 @IsString({ message: 'Name must be a string' })
 @IsNotEmpty()
 @MinLength(2, { message: 'firstName must be more then 2 symbols' })
 @MaxLength(50, { message: 'firstName must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'name must contain only letters, apostrophe, and dash',
 })
 name: string;

 @ApiProperty({ example: 'Surname', description: 'Прізвище користувача', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'surname must be more then 2 symbols' })
 @MaxLength(50, { message: 'surname must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'surname must contain only letters, apostrophe, and dash',
 })
 @IsString({ message: 'surname must be a string' })
 surname: string;

 @ApiProperty({ example: '380501112233', description: 'Телефон користувача', required: true })
 @IsPhoneNumber(null, { message: 'Invalid phone number' })
 @IsOptional()
 phone: string;

 @ApiProperty({ example: 'Telegram', description: 'Месенджер користувача' })
 @IsString({ message: 'Messenger must be a string' })
 @MaxLength(50, { message: 'messenger must be less then 50 symbols' })
 messenger: string;

 @ApiProperty({ example: true, description: 'Приймаємо розсилку' })
 @IsOptional()
 @IsBoolean({ message: 'IsGetEmail must be a boolean' })
 isGetEmail: boolean;

 @ApiProperty({ example: '2024-04-09T05:56:22.615Z', description: 'Час встановлення тимчасового паролю' })
 @IsOptional()
 @IsBoolean({ message: 'datePassword must string' })
 datePassword: string;
}
