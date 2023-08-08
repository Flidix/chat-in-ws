import { Injectable } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { DatabaseService } from '@shared/database/services/database.service';

import { SendMessageDto } from './dtos/send-message.dto';
import {SocketEventPayload} from "./types";
import {InjectDataSource} from "@nestjs/typeorm";
import {DataSource} from "typeorm";
import {MessagesService} from "../messages/messages.service";
import {AddUserToGroup} from "./dtos/addUserToGroup";
import {GroupService} from "../group/group.service";

@Injectable()
export class ChatService extends DatabaseService {

  constructor(@InjectDataSource() datasource: DataSource,
              private readonly messagesService: MessagesService,
              private readonly groupService: GroupService) {
    super(datasource)
  }

  async sendMessage(body: SocketEventPayload<SendMessageDto>) {
    const { server, message, userId, groupId } = body;

    await this.database.userToGroups.findOneOrFail({ where: { groupId, userId } });
    const createMessage = await this.messagesService.senadMessage(body, userId)
    server.to(`${groupId}`).emit('message', { ...createMessage});
  }

  async addUserToGroup(dto: AddUserToGroup, userId: number, socket, server) {
    await this.database.userToGroups.findOneOrFail({ where: { groupId: dto.groupId, userId: userId } });
    const user = await this.groupService.addUserToGroup(dto);

    socket.join(`${dto.groupId}`);
    server.to(`${dto.groupId}`).emit('join', { user });
  }
}
