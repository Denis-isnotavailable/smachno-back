import { Exclude } from 'class-transformer';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { Role } from 'src/utils/enums/role.enum';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { UserDeliveryAddressEntity } from '../../user-delivery-address/entities/user-delivery-address.entity';

@Entity({ name: 'users' })
export class UserEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 name: string;

 @Column()
 surname: string;

 @Column({ unique: true })
 email: string;

 @Column()
 @Exclude()
 password: string;

 @Column({ nullable: true, unique: true })
 phone: string;

 @Column({ nullable: true })
 messenger: string;

 @Column({ type: 'enum', enum: Role, array: true, default: [Role.USER] })
 roles: Role[];

 @CreateDateColumn()
 createdAt: Timestamp;

 @OneToMany(() => UserDeliveryAddressEntity, address => address.user, { cascade: true })
 deliveryAddresses: UserDeliveryAddressEntity[];

 @OneToMany(() => OrderEntity, order => order.user, { cascade: true })
 orders: OrderEntity[];

 @Column({ nullable: true })
 isGetEmail: boolean;

 @Column({ nullable: true })
 datePassword: string;
}
