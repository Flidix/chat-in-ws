import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@shared/database/database.module';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ChatModule, MessagesModule, GroupModule,],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
