import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsRepository } from './comment.repository';
import { Comments } from './comment.entity';
import { UsersRepository } from 'src/users/users.repository';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/users.entity';
import { Comics } from 'src/comics/comics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comments,Users, Comics])],
  controllers: [CommentController],
  providers: [CommentService, CommentsRepository, ]
})
export class CommentModule {}
