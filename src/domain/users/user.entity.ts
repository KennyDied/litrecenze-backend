import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Review } from '../reviews/review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  phone: string;

  @ManyToMany(() => Role, role => role.user)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  rate: number;
}