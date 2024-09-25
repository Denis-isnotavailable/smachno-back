import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'monopay' })
export class MonopayEntity {
 @Column({ nullable: true, default: '' })
 invoiceId?: string;

 @Column({ nullable: true, default: '' })
 status?: string;

 @PrimaryColumn()
 reference: string;

 @Column({ nullable: true, default: '' })
 modifiedDate?: string;

 @Column({ nullable: true, default: '' })
 failureReason?: string;

 @Column({ nullable: true, default: '' })
 errCode?: string;
}
