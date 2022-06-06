import { Entity, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, message => message.chat)
  @JoinTable()
  messages: Message[];
}
