import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Review } from '../reviews/review.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0, nullable: true, type: 'float' })
  rate: number;

  @ManyToOne(() => Author, author => author.books, { cascade: true })
  author: Author;

  @OneToMany(() => Review, review => review.book, { cascade: true })
  reviews: Review[];
}
