import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

import { AddUserToGroup } from '../chat/dtos/addUserToGroup';
import {CreateGroupDto} from "./dtos/Create-group.dto";

@Injectable()
export class GroupService extends DatabaseService {
  async createGroup(dto: CreateGroupDto, userId: number) {
    const user = await this.database.users.findOneOrFail({ where: { id: userId } });
    const group = await this.database.groups.create({
      name: dto.name,
      userId,
    });
    await this.database.userToGroups.create({
      groupId: group.id,
      user,
      group,
      userId,
    });
    return group;
  }

  async addUserToGroup(dto: AddUserToGroup) {
    const user = await this.database.users.findOneOrFail({where: {id: dto.userId}});
    const checkUser = await this.database.userToGroups.findOne({where: {userId: dto.userId, groupId: dto.groupId}});
    if (checkUser) throw new HttpException('user already added', HttpStatus.BAD_REQUEST)
    return await this.database.userToGroups.create({
      userId: dto.userId,
      groupId: dto.groupId,
      user,
    });
  }

  async getGroups(userId: number) {
    return await this.database.groups.findAllOrFail({
      where: { userId },
    });
  }

  async getGroup(userId: number, groupId: number) {
    await this.database.userToGroups.findOneOrFail({ where: { userId, groupId } });
    return await this.database.groups.findOneOrFail({
      where: { id: groupId },
      relations: {
        userToGroups: { user: true },
        messages: { user: true },
      },
    });
  }


}
