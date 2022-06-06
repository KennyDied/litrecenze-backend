import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UserReview } from './user-review.entity';

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
  @ManyToMany(() => UserReview)
  @JoinTable()
  rateOfUsers: UserReview[];

  @ApiProperty()
  @ManyToOne(() => Book, book => book.reviews)
  book: Book;

  @ApiProperty()  
  @ManyToOne(() => User, user => user.reviews)
  user: User;
}
