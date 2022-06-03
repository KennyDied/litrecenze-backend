import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Chat } from './chat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, chat => chat.messages)
  chat: Chat;

  @ManyToOne(() => User)
  @JoinTable()
  sender: User;

  @Column()
  text: string;

  @Column()
  sendAt: Date;
}