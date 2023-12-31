import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { ChatService } from './chat.service';


import { WebSocketAuthGuard } from '../auth/decorators/socket.auth.guard';
import { SocketCtx } from '../auth/decorators/socket-ctx.decorator';
import { AddUserToGroup } from './dtos/addUserToGroup';
import {SendMessageDto} from "./dtos/send-message.dto";

@UseGuards(WebSocketAuthGuard)
@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('message')
  onMessage(
    @SocketCtx() userId: number,
    @MessageBody() dto: SendMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    return this.chatService.sendMessage({
      server: this.server,
      socket,
      userId,
      ...dto,
    });
  }

  @SubscribeMessage('join')
  onJoin(
    @ConnectedSocket() socket: Socket,
    @SocketCtx() userId: number,
    @MessageBody() body: AddUserToGroup,
  ) {
    return this.chatService.addUserToGroup( body, userId, socket, this.server);
  }
}
