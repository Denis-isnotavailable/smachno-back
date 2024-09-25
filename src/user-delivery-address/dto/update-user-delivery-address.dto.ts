import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, MinLength, MaxLength, IsPhoneNumber, Matches } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateUserDeliveryAddressDto } from './create-user-delivery-address.dto';

export class UpdateUserDeliveryAddressDto extends PartialType(CreateUserDeliveryAddressDto) {
 @IsOptional()
 user?: UserEntity;

 @ApiProperty({ example: 'Мама,Батько,Кум,Сват', description: 'Хто цей отримувач', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'title must be more than 2 symbols' })
 @MaxLength(50, { message: 'title must be less than 50 symbols' })
 @IsString({ message: 'title must be a string' })
 @IsOptional()
 title?: string;

 @ApiProperty({ example: 'Тарас', description: "Ім'я користувача", required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'firstName must be more than 2 symbols' })
 @MaxLength(50, { message: 'firstName must be less than 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^0-9./`~@^()_+=?<>]*$/u, {
  message: 'firstName must contain only letters, apostrophe, and dash, and cannot contain numbers',
 })
 @IsString({ message: 'firstName must be a string' })
 @IsOptional()
 firstName?: string;

 @ApiProperty({ example: 'Шевченко', description: 'Прізвище користувача', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'surname must be more than 2 symbols' })
 @MaxLength(50, { message: 'surname must be less than 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^0-9./`~@^()_+=?<>]*$/u, {
  message: 'surname must contain only letters, apostrophe, and dash, and cannot contain numbers',
 })
 @IsString({ message: 'surname must be a string' })
 @IsOptional()
 surname?: string;

 @ApiProperty({ example: '+380501112233', description: 'Номерочок', required: true })
 @IsPhoneNumber(null, { message: 'Invalid phone number' })
 @IsNotEmpty()
 @IsString({ message: 'phone must be a string' })
 @IsOptional()
 phone?: string;

 @ApiProperty({ example: 'Київська', description: 'Область', required: true })
 @IsNotEmpty()
 @MinLength(3, { message: 'area must be more than 3 symbols' })
 @MaxLength(50, { message: 'area must be less than 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^0-9./`~@^()_+=?<>]*$/u, {
  message: 'area must contain only letters, apostrophe, and dash, and cannot contain numbers',
 })
 @IsString({ message: 'area must be a string' })
 @IsOptional()
 area?: string;

 @ApiProperty({ example: 'Київ', description: 'Чудове місто', required: true })
 @IsNotEmpty()
 @MinLength(3, { message: 'city must be more than 3 symbols' })
 @MaxLength(100, { message: 'city must be less than 100 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^0-9./`~@^()_+=?<>]*$/u, {
  message: 'city must contain only letters, apostrophe, and dash, and cannot contain numbers',
 })
 @IsString({ message: 'city must be a string' })
 @IsOptional()
 city?: string;

 @ApiProperty({ example: 'Відділення №1', description: 'Відділення Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'novaPostOffice must be less than 100 symbols' })
 @IsString({ message: 'novaPostOffice must be a string' })
 novaPostOffice?: string | null;

 @ApiProperty({ example: 'Поштомат №1', description: 'Поштоматик Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'novaPostLocker must be less than 100 symbols' })
 @IsString({ message: 'novaPostLocker must be a string' })
 novaPostLocker?: string | null;

 @ApiProperty({ example: 'вул. Шевченка 1', description: "Доставка жвавим кур'єром", required: false })
 @IsOptional()
 @MaxLength(100, { message: 'personalAddress must be less than 100 symbols' })
 @IsString({ message: 'personalAddress must be a string' })
 personalAddress?: string | null;
}
