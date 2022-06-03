import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToOne(() => Chat, chat => chat.club)
  chat: Chat;

  @ManyToOne(() => User, user => user.managedClubs)
  owner: User;

  @ManyToMany(() => User, user => user.clubs)
  members: User[];
}
