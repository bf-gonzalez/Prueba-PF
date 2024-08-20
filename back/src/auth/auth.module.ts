import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { MembershipModule } from 'src/membership/membership.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), MembershipModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, MailerService],
})
export class AuthModule {}
