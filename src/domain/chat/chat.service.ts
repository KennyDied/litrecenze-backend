import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { UsersService } from '../users/users.service';
import { MessageDto } from './dto/message.dto';
import { Club } from '../clubs/entities/club.entity';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  async createChat() {
    return await this.chatsRepository.save(this.chatsRepository.create());
  }

  async getUserAndChatFromSocket(socket: Socket) {
    const token = socket.handshake.headers.authorization.split(' ')[1];
    const chatId = +socket.handshake.headers.chatid;
    if (!token) {
      throw new WsException('Invalid credentials.');
    }
    const user = await this.authService.getUserFromToken(token);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    const chat = await this.chatsRepository.findOne({ where: { id: chatId } });
    return { user, chat };
  }

  async getChat(id: number) {
    return await this.chatsRepository.findOne({
      where: { id: id },
    });
  }

  async getMessages(id: number) {
    const { messages } = await this.chatsRepository.findOne({ where: { id }, relations: { messages: true } })
    return messages;
  }

  async message(text: string, userID: number, chatID: number) {
    const user = await this.usersService.getUser(userID);
    const chat = await this.chatsRepository.findOne({
      where:{ id: chatID }
    });

    const message = await this.messageRepository.create({ text: text, sendAt: new Date() });
    message.chat = chat;
    message.sender = user;

    return await this.messageRepository.save(message);
  }

  async update(chatId: number) {
    const { messages } = await this.chatsRepository.findOne({
      where: { id: chatId},
      relations: {
        messages: true
      }
    });
    return messages;
  }
}
