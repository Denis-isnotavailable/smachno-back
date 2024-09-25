import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemsGrowthOrderEntity } from './items-growth-order.entity';

import { OrderEntity } from './order.entity';

@Entity({ name: 'growth-order' })
export class GrowthOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 totalPrice: number;

 @Column()
 orderId: number;

 @ManyToOne(() => OrderEntity, order => order.growthOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'orderId' })
 order: OrderEntity;

 @OneToMany(() => ItemsGrowthOrderEntity, growthOrder => growthOrder.growthOrder, { cascade: true })
 itemsGrowthOrder: ItemsGrowthOrderEntity[];
}
