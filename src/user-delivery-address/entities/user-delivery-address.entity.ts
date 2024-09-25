import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

@Entity({})
export class UserDeliveryAddressEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column()
 title: string;

 @Column()
 firstName: string;

 @Column()
 surname: string;

 @Column()
 phone: string;

 @Column({ nullable: true })
 area: string;

 @Column()
 city: string;

 @Column({ nullable: true })
 novaPostOffice: string;

 @Column({ nullable: true })
 novaPostLocker: string;

 @Column({ nullable: true })
 personalAddress: string;

 @ManyToOne(() => UserEntity, user => user.deliveryAddresses)
 user: UserEntity;
}
