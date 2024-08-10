import { forwardRef, Module } from '@nestjs/common';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comics } from './comics.entity';
import { Categories } from 'src/categories/categories.entity';
import { ComicsRepository } from './comics.repository';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { Users } from 'src/users/users.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comics, Categories, Users]),
  forwardRef(() => MembershipModule),
    forwardRef(() => UsersModule)],
  controllers: [ComicsController],
  providers: [ComicsService, ComicsRepository, UsersRepository, MailerService],
})
export class ComicsModule {}
