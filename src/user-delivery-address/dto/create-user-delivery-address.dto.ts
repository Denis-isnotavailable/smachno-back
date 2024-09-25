import { ApiProperty } from '@nestjs/swagger';
import {
 IsNotEmpty,
 IsOptional,
 IsPhoneNumber,
 IsString,
 Matches,
 MaxLength,
 MinLength,
 Validate,
} from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class CreateUserDeliveryAddressDto {
 @IsOptional()
 user?: UserEntity;

 @ApiProperty({ example: 'Мама,Батько,Кум,Сват', description: 'Хто цей отримувач', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'title must be more then 2 symbols' })
 @MaxLength(50, { message: 'title must be less then 50 symbols' })
 @IsString({ message: 'title must be a string' })
 title: string;

 @ApiProperty({ example: 'Тарас', description: "Ім'я користувача", required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'firstName must be more then 2 symbols' })
 @MaxLength(50, { message: 'firstName must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'firstName must contain only letters, apostrophe, and dash',
 })
 @IsString({ message: 'firstName must be a string' })
 firstName: string;

 @ApiProperty({ example: 'Шевченко', description: 'Прізвище користувача', required: true })
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
 @IsNotEmpty()
 @IsString({ message: 'phone must be a string' })
 phone: string;

 @ApiProperty({ example: 'Київська', description: 'Область', required: true })
 @IsNotEmpty()
 @MinLength(3, { message: 'area must be more then 3 symbols' })
 @MaxLength(50, { message: 'area must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'area must contain only letters, apostrophe, and dash',
 })
 @IsString({ message: 'area must be a string' })
 area: string;

 @ApiProperty({ example: 'Київ', description: 'Чудове місто', required: true })
 @IsNotEmpty()
 @MinLength(3, { message: 'city must be more then 3 symbols' })
 @MaxLength(100, { message: 'city must be less then 100 symbols' })
 @IsString({ message: 'city must be a string' })
 city: string;

 @ApiProperty({ example: 'Відділення №1', description: 'Відділення Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'novaPostOffice must be less then 100 symbols' })
 @IsString({ message: 'novaPostOffice must be a string' })
 novaPostOffice?: string | null;

 @ApiProperty({ example: 'Поштомат №1', description: 'Поштоматик Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'novaPostLocker must be less then 100 symbols' })
 @IsString({ message: 'novaPostLocker must be a string' })
 novaPostLocker?: string | null;

 @ApiProperty({ example: 'вул. Шевченка 1', description: "Доставка жвавим кур'єром", required: false })
 @IsOptional()
 @MaxLength(100, { message: 'personalAddress must be less then 100 symbols' })
 @IsString({ message: 'personalAddress must be a string' })
 personalAddress?: string | null;

 @Validate(CreateUserDeliveryAddressDto)
 checkAddressType() {
  const addressTypes = ['novaPostOffice', 'novaPostLocker', 'personalAddress'];
  let count = 0;
  for (const type of addressTypes) {
   if (this[type]) {
    count++;
   }
  }
  if (count !== 1) {
   throw new Error('Exactly one of novaPostOffice, novaPostLocker, or personalAddress should be provided');
  }
 }
}
