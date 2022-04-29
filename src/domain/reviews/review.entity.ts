import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  text: string;

  @Column({ type: 'float' })
  rate: number;

  @ManyToOne(() => Book, book => book.reviews)
  book: Book;

  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
