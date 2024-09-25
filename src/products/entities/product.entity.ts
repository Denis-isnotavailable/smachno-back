import {
 Column,
 CreateDateColumn,
 Entity,
 ManyToOne,
 PrimaryGeneratedColumn,
 Timestamp,
 UpdateDateColumn,
} from 'typeorm';

import { ItemsSelfOrderEntity } from '../../orders/entities/items-self-order.entity';
import { ItemsZsuOrderEntity } from '../../orders/entities/items-zsu-order.entity';
@Entity({ name: 'Product' })
export class ProductEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 name: string;

 @Column()
 description: string;

 @Column({ nullable: true })
 productIcon: string;

 @Column({ nullable: true })
 iconPublicId: string;

 @Column({ nullable: true })
 productImage: string;

 @Column({ nullable: true })
 imagePublicId: string;

 @Column()
 price: number;

 @Column()
 packaging: string;

 @CreateDateColumn()
 seasonStart: Date;

 @CreateDateColumn()
 seasonEnd: Date;

 @Column({ nullable: true, type: 'decimal', precision: 8, scale: 2 })
 weightMin: number;

 @Column({ nullable: true, type: 'decimal', precision: 8, scale: 2 })
 weightMax: number;

 @Column()
 unit: string;

 @Column({ nullable: true })
 dimensionsHeight: number;

 @Column({ nullable: true })
 dimensionsWidth: number;

 @Column({ nullable: true })
 dimensionsLength: number;

 @Column()
 shipping: boolean;

 @Column({ nullable: true })
 isReadyToOrderForGrowth: boolean;

 @Column({ nullable: true })
 isNowInSell: boolean;

 @Column({ default: false })
 isDeleted: boolean;

 @CreateDateColumn({ nullable: true })
 deletedAt: Date;

 @CreateDateColumn()
 createdAt: Timestamp;
 @UpdateDateColumn()
 updatedAt: Timestamp;

 @ManyToOne(() => ItemsSelfOrderEntity, itemsSelfOrder => itemsSelfOrder.product)
 itemsSelfOrder: ItemsSelfOrderEntity[];

 @ManyToOne(() => ItemsZsuOrderEntity, itemsZsuOrder => itemsZsuOrder.product)
 itemsZsuOrder: ItemsZsuOrderEntity[];

 @ManyToOne(() => ItemsSelfOrderEntity, itemsGrowthOrder => itemsGrowthOrder.product)
 itemsGrowthOrder: ItemsSelfOrderEntity[];
}
