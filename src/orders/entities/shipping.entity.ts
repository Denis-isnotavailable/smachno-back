import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shipping' })
export class ShippingEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 userId: number;

 @Column()
 orderId: number;

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

 @OneToOne(() => OrderEntity, order => order.shippingAddress, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'orderId' })
 order: OrderEntity;
}
