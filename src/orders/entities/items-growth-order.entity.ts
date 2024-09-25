import { ProductEntity } from '@src/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GrowthOrderEntity } from './growth-order.entity';

@Entity({ name: 'items-growth-order' })
export class ItemsGrowthOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column({ nullable: true })
 plate?: string;

 @Column()
 order_quantity: number;

 @ManyToOne(() => ProductEntity, product => product.itemsGrowthOrder, { cascade: true })
 product: ProductEntity;

 @ManyToOne(() => GrowthOrderEntity, growthOrder => growthOrder.itemsGrowthOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'growthOrderId' })
 growthOrder: GrowthOrderEntity;

 @Column({ default: false })
 status: boolean;
}
