import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';

import { databaseTables } from '@shared/database/constants';
import {UserToGroupEntity} from "../../group/entities/user-to-group.entity";

@Entity({ name: databaseTables.users })
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => UserToGroupEntity, (userToGroup) => userToGroup.user)
  userToGroups?: UserToGroupEntity[];
}
