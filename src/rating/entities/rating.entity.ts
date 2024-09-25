import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rating' })
export class RatingEntity {
 @PrimaryGeneratedColumn('increment')
 id: number;

 @Column({ type: 'int' })
 rating: number;

 @CreateDateColumn({ type: 'timestamp' })
 createdAt: Date;

 @Column({ type: 'varchar', length: 45, nullable: true })
 clientIp: string;

 @Column({ type: 'varchar', length: 100, nullable: true })
 country: string;

 @Column({ type: 'varchar', length: 100, nullable: true })
 city: string;
}
