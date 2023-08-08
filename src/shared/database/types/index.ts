import { DatabaseRepository } from '../repositories/database.repository';
import {UserEntity} from "../../../user/entities/user.entity";
import {MessageEntity} from "../../../messages/entities/message.entity";
import {GroupEntity} from "../../../group/entities/group.entity";
import {UserToGroupEntity} from "../../../group/entities/user-to-group.entity";

export type DatabaseEntitiesType = {
  users: UserEntity,
  messages: MessageEntity;

  groups: GroupEntity;
  userToGroups: UserToGroupEntity;
};

export type DatabaseRepositories = {
  [table in keyof DatabaseEntitiesType]: DatabaseRepository<DatabaseEntitiesType[table]>;
};
