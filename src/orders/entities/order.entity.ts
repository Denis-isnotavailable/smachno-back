import {
 Column,
 CreateDateColumn,
 Entity,
 ManyToOne,
 PrimaryGeneratedColumn,
 OneToOne,
 JoinColumn,
 OneToMany,
} from 'typeorm';
import { MonopayEntity } from '../../monopay/entities/monopay.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { GrowthOrderEntity } from './growth-order.entity';
import { SelfOrderEntity } from './self-order.entity';
import { ShippingEntity } from './shipping.entity';
import { ZsuOrderEntity } from './zsu-order.entity';

@Entity({ name: 'order' })
export class OrderEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @CreateDateColumn()
 orderAt: Date;

 @Column({ type: 'decimal', precision: 10, default: 0, scale: 2 })
 totalAllPrice: number;

 @OneToOne(() => MonopayEntity, { eager: true, cascade: true })
 @JoinColumn({ name: 'paymentReference' })
 payment_reference: MonopayEntity;

 @Column({ type: 'int', default: 0 })
 received_status: number;

 @ManyToOne(() => UserEntity, user => user.orders)
 user: UserEntity;

 @OneToOne(() => ShippingEntity, { eager: true, cascade: true })
 @JoinColumn()
 shippingAddress: ShippingEntity;

 @OneToMany(() => GrowthOrderEntity, growthOrder => growthOrder.order, { nullable: true, cascade: true, eager: true })
 @JoinColumn()
 growthOrder: GrowthOrderEntity[];

 @OneToMany(() => SelfOrderEntity, selfOrder => selfOrder.order, { nullable: true, cascade: true, eager: true })
 @JoinColumn()
 selfOrder: SelfOrderEntity[];

 @OneToMany(() => ZsuOrderEntity, zsuOrder => zsuOrder.order, { nullable: true, cascade: true, eager: true })
 @JoinColumn()
 zsuOrder: ZsuOrderEntity[];

 @Column({ nullable: true })
 statusLiqPay: string;
}
