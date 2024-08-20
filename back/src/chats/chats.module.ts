import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { ChatsRepository } from './chats.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './chats.entity';
import { Users } from 'src/users/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Chats,Users])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsRepository]
})
export class ChatsModule {}
