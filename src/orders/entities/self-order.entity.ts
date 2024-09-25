import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemsSelfOrderEntity } from './items-self-order.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'self-order' })
export class SelfOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 totalPrice: number;

 @Column()
 orderId: number;

 @ManyToOne(() => OrderEntity, order => order.selfOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'orderId' })
 order: OrderEntity;

 @OneToMany(() => ItemsSelfOrderEntity, itemsSelfOrder => itemsSelfOrder.selfOrder, { cascade: true })
 itemsSelfOrder: ItemsSelfOrderEntity[];
}
