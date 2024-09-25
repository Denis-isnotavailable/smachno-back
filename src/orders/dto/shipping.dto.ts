import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';

export class ShippingDto {
 @IsNotEmpty()
 @IsString()
 @MinLength(2)
 @MaxLength(50)
 @ApiProperty({ example: 'Тарас', description: 'Ім’я' })
 firstName: string;

 @IsNotEmpty()
 @IsString()
 @MinLength(2)
 @MaxLength(50)
 @ApiProperty({ example: 'Шевченко', description: 'Прізвище' })
 surname: string;

 @IsNotEmpty()
 @IsPhoneNumber('UA', { message: 'Invalid Ukrainian phone number' })
 @ApiProperty({ example: '+380711111111', description: 'Телефон' })
 phone: string;

 @IsNotEmpty()
 @IsString()
 @MinLength(2)
 @MaxLength(50)
 @ApiProperty({ example: 'Вінницька', description: 'Область' })
 area: string;

 @IsNotEmpty()
 @IsString()
 @MinLength(2)
 @MaxLength(50)
 @ApiProperty({ example: 'City', description: 'Місто' })
 city: string;

 @IsNotEmpty()
 @IsString()
 @ValidateIf(o => !o.novaPostLocker && !o.personalAddress)
 @ApiProperty({ example: '5', description: 'Номер відділення Нової Пошти', required: false })
 novaPostOffice: string;

 @IsNotEmpty()
 @IsString()
 @ValidateIf(o => !o.novaPostOffice && !o.personalAddress)
 @ApiProperty({ example: '5', description: 'Поштомат Нової Пошти', required: false })
 novaPostLocker: string;

 @IsNotEmpty()
 @IsString()
 @ValidateIf(o => !o.novaPostOffice && !o.novaPostLocker)
 @ApiProperty({ example: 'Some Street 1', description: 'Персональна адреса', required: false })
 @MinLength(2)
 @MaxLength(50)
 personalAddress: string;
}
