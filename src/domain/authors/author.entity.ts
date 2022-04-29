import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  dateOfBirth: Date;

  @Column({ nullable: true })
  dateOfDeath: Date;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Book, book => book.author)
  @JoinTable()
  books: Book[];
}
