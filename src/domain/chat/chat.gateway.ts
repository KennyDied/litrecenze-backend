import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection, ConnectedSocket, WsException,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  async handleConnection(socket: Socket) {
    const {user, chat} = await this.chatService.getUserAndChatFromSocket(socket);
    if (!user || !chat) {
      throw new WsException('Пизда');
    }
  }

  @SubscribeMessage('update')
  async update(@ConnectedSocket() socket: Socket) {
    const payload = await this.chatService.getUserAndChatFromSocket(socket);
    const messages = await this.chatService.getMessages(payload.chat.id);
    socket.emit('update_messages', messages);
    return messages;
  }

  @SubscribeMessage('message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() message: string,
  ) {
    const payload = await this.chatService.getUserAndChatFromSocket(client);
    const newMessage = await this.chatService.message(message, payload.user['id'], payload.chat.id);
    client.emit('message', newMessage);
    this.server.sockets.emit('message', newMessage);
    return newMessage;
  }

  private async refreshMessages(socket: Socket) {
    const payload = await this.chatService.getUserAndChatFromSocket(socket);
    const messages = await this.chatService.getMessages(payload.chat.id);
    this.server.sockets.emit('update', messages);

    return messages;
  }
}
