import { ApiProperty } from '@nestjs/swagger';
import {
 IsArray,
 IsEmail,
 IsNotEmpty,
 IsNumber,
 IsOptional,
 IsPhoneNumber,
 IsString,
 Matches,
 MaxLength,
 MinLength,
} from 'class-validator';

interface IProducts {
 amount: number;
 forMe: number;
 forArmy: number;
 forGrow: number;
 name: string;
 price: number;
 packaging: string;
}

export class ProductsValidator implements IProducts {
 @IsNumber()
 @IsNotEmpty()
 amount: number;

 @IsNumber()
 forMe: number;

 @IsNumber()
 forArmy: number;

 @IsNumber()
 forGrow: number;

 @IsString()
 @IsNotEmpty()
 name: string;

 @IsNumber()
 @IsNotEmpty()
 price: number;

 @IsString()
 @IsNotEmpty()
 packaging: string;
}

export class SendEmailDto {
 @ApiProperty({ example: 'Поштомат №1', description: 'Поштоматик Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'box must be less then 100 symbols' })
 box: string | null;

 @ApiProperty({ example: 'Київ', description: 'Чудове місто', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'city must be more then 2 symbols' })
 @MaxLength(50, { message: 'city must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'city must contain only letters, apostrophe, and dash',
 })
 @IsString()
 city: string;

 @ApiProperty({
  example: 'example@com.ua',
  description: 'Email',
  required: true,
 })
 @IsEmail()
 @IsNotEmpty()
 email: string;

 @ApiProperty({ example: 'Іван', description: "Його прекрасне ім'я", required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'firstName must be more then 2 symbols' })
 @MaxLength(50, { message: 'firstName must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'name must contain only letters, apostrophe, and dash',
 })
 @IsString()
 name: string;

 @ApiProperty({ example: 'Іванов', description: 'Його прізвище', required: true })
 @IsNotEmpty()
 @MinLength(2, { message: 'surname must be more then 2 symbols' })
 @MaxLength(50, { message: 'surname must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'surname must contain only letters, apostrophe, and dash',
 })
 @IsString()
 surname: string;

 @ApiProperty({ example: 'Відділення №1', description: 'Відділення Нової Пошти', required: false })
 @IsOptional()
 @MaxLength(100, { message: 'office must be less then 100 symbols' })
 @IsString()
 office: string | null;

 @ApiProperty({ example: '380501112233', description: 'Телефон користувача', required: true })
 @IsPhoneNumber('UA', { message: 'Invalid Ukrainian phone number' })
 @IsNotEmpty()
 @IsString()
 phone: string;

 @ApiProperty({
  type: [Object],
  example: [
   {
    amount: 3,
    forMe: 0,
    forArmy: 2,
    forGrow: 1,
    name: 'Кукурудза',
    price: 1500,
    packaging: 'ящ.',
   },
  ],
  description: 'Масив об"єктів товару',
  required: true,
 })
 @IsArray()
 @IsNotEmpty()
 cartProducts: ProductsValidator[];

 @ApiProperty({
  example: 32,
  description: 'Номер замовлення',
  required: true,
 })
 @IsNumber()
 @IsNotEmpty()
 numberOrder: number;

 @ApiProperty({ example: 'Київська', description: 'Область', required: true })
 @IsNotEmpty()
 @MinLength(3, { message: 'area must be more then 3 symbols' })
 @MaxLength(50, { message: 'area must be less then 50 symbols' })
 @Matches(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'-ʼ-][^./`~@^()_+=?<>]*$/u, {
  message: 'area must contain only letters, apostrophe, and dash',
 })
 @IsString()
 area: string;

 @ApiProperty({ example: 'вул. Шевченка 1', description: "Доставка жвавим кур'єром", required: false })
 @IsOptional()
 @MaxLength(100, { message: 'personalAddress must be less then 100 symbols' })
 @IsString()
 address: string | null;

 @ApiProperty({
  example: '1500',
  description: 'Загальна сума',
  required: true,
 })
 @IsNumber()
 totalPrice: number;
}

export interface IChangeArrayOrder {
 name: string;
 amount: string;
 forMe: string;
 forArmy: string;
 forGrow: string;
 price: string;
}
