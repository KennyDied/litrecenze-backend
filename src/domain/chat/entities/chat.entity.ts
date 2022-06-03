import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Club } from '../../clubs/entities/club.entity';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Club, club => club.chat)
  club: Club;

  @OneToMany(() => Message, message => message.chat)
  messages: Message[];
}
