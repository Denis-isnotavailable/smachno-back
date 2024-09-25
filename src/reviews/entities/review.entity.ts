import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({ name: 'reviews' })
export class ReviewEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;
 @Column()
 reviewUrl: string;
 @Column({ nullable: true })
 reviewImage: string;
 @Column({ nullable: true })
 reviewImagePublicId: string;
 @Column()
 text: string;
 @CreateDateColumn()
 createdAt: Timestamp;
}
