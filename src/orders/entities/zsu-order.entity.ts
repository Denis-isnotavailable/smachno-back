import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemsZsuOrderEntity } from './items-zsu-order.entity';
import { OrderEntity } from './order.entity';

@Entity({ name: 'zsu-order' })
export class ZsuOrderEntity {
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 totalPrice: number;

 @Column()
 orderId: number;

 @ManyToOne(() => OrderEntity, order => order.zsuOrder, { onDelete: 'CASCADE' })
 @JoinColumn({ name: 'orderId' })
 order: OrderEntity;

 @OneToMany(() => ItemsZsuOrderEntity, zsuOrder => zsuOrder.zsuOrder, { cascade: true })
 itemsZsuOrder: ItemsZsuOrderEntity[];
}
