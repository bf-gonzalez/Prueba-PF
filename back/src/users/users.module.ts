import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { MembershipModule } from 'src/membership/membership.module';


@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef (() =>MembershipModule)],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, MailerService],
  exports: [UsersRepository, UsersService],
})
export class UsersModule {}
