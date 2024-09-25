import { ProductEntity } from '@src/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ZsuOrderEntity } from './zsu-order.entity';

@Entity({ name: 'items-zsu-order' })
export class ItemsZsuOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 order_quantity: number;

 @ManyToOne(() => ProductEntity, product => product.itemsZsuOrder, { cascade: true })
 product: ProductEntity;

 @ManyToOne(() => ZsuOrderEntity, zsuOrder => zsuOrder.itemsZsuOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'zsuOrderId' })
 zsuOrder: ZsuOrderEntity;

 @Column({ default: false })
 status: boolean;
}
