import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reviews')
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column({ type: 'float' })
  rate: number;

  @ApiProperty()
  @ManyToOne(() => Book, book => book.reviews)
  book: Book;

  @ApiProperty()  
  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
