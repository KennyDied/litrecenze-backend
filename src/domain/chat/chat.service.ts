import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private usersService: UsersService,
  ) {}

  async message(dto: MessageDto) {
    const user = await this.usersService.getUser(dto.userID);
    const chat = await this.chatsRepository.findOne({
      where:{ id: dto.chatID }
    });

    const message = await this.messageRepository.create({ text: dto.text, sendAt: new Date() });
    message.chat = chat;
    message.sender = user;

    return await this.messageRepository.save(message);
  }
}
