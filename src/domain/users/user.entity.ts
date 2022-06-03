import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Review } from '../reviews/review.entity';
import { Book } from '../books/book.entity';
import { Club } from '../clubs/entities/club.entity';

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

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  rate: number;

  @ManyToMany(() => Club, club => club.members)
  @JoinTable()
  clubs: Club[];

  @OneToMany(() => Club, club => club.owner)
  managedClubs: Club[];

  @ManyToMany(() => Role, role => role.user)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  @OneToMany(() => Review, review => review.user, { cascade: true })
  reviews: Review[];
}