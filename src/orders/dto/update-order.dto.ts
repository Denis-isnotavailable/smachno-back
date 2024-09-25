import { PartialType } from '@nestjs/swagger';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 firstName: string;

 @Column()
 surname: string;

 @Column()
 phone: string;

 @Column()
 city: string;

 @Column({ nullable: true })
 novaPostOffice: string;

 @Column({ nullable: true })
 novaPostLocker: string;

 @Column({ nullable: true })
 personalAddress: string;

 @CreateDateColumn()
 orderAt: Date;

 @Column({ type: 'decimal', precision: 10, default: 0, scale: 2 })
 total_price: number;
}
