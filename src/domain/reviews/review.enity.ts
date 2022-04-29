import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  text: string;

  @Column({ type: 'float' })
  rate: number;

  @OneToOne(() => Book, book => book.id)
  book: Book;

  @OneToOne(() => User, user => user.id)
  user: User;
}
