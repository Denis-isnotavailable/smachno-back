import { ProductEntity } from '@src/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SelfOrderEntity } from './self-order.entity';

@Entity({ name: 'items-self-order' })
export class ItemsSelfOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 order_quantity: number;

 @ManyToOne(() => ProductEntity, product => product.itemsSelfOrder, { cascade: true })
 product: ProductEntity;

 @ManyToOne(() => SelfOrderEntity, selfOrder => selfOrder.itemsSelfOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'selfOrderId' })
 selfOrder: SelfOrderEntity;

 @Column({ default: false })
 status: boolean;
}
