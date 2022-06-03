import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('createChat')
  create(@MessageBody() message: MessageDto) {
    return this.chatService.message(message);
  }
}
