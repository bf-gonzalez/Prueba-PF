import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MembershipModule } from './membership/membership.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ComicsModule } from './comics/comics.module';
import { JwtModule } from '@nestjs/jwt';
import { CommentModule } from './comment/comment.module';

import { EventsModule } from './events/events.module';

import { ChatsModule } from './chats/chats.module';
import { CronService } from './cron/cron.service';
import { MailerService } from './mailer/mailer.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    ComicsModule,
    MembershipModule,
    CategoriesModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    CommentModule,

    EventsModule,

    ChatsModule,

  ],
  controllers: [AppController],
  providers: [AppService, CronService, MailerService],
  exports: [CronService],
})
export class AppModule {}