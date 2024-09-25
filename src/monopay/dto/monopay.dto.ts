import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class MonopayDto {
 @ApiProperty({
  example: 'p2_9ZgpZVsl3',
  description: 'Ідентифікатор рахунку',
 })
 @IsString()
 @IsOptional()
 invoiceId?: string;

 @ApiProperty({
  example: '"created" "processing" "hold" "success" "failure" "reversed" "expired"',
  description: 'Ідентифікатор рахунку',
 })
 @IsString()
 @IsOptional()
 status?: 'created' | 'processing' | 'hold' | 'success' | 'failure' | 'reversed' | 'expired';

 @ApiProperty({
  example: '255',
  description: 'Референс платежу',
 })
 @IsString()
 reference: string;

 @ApiProperty({
  example: '2019-08-24T14:15:22Z',
  description: 'Дата і час останньої модифікації операції',
 })
 @IsString()
 @IsOptional()
 modifiedDate?: string;

 @ApiProperty({
  example: 'Неправильний CVV код',
  description: 'Причина відмови',
 })
 @IsString()
 @IsOptional()
 failureReason?: string;

 @ApiProperty({
  example: '59',
  description: 'Код помилки, яка виникла під час обробки платежу',
 })
 @IsString()
 @IsOptional()
 errCode?: string;
}
