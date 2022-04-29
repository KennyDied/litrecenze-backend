import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
