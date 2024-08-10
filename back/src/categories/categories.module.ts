import { Module, OnModuleInit } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { ComicsService } from 'src/comics/comics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { Comics } from 'src/comics/comics.entity';
import { ComicsRepository } from 'src/comics/comics.repository';
import { Users } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { CategoriesRepository } from './categories.repository';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { MembershipModule } from 'src/membership/membership.module';
import { Role } from 'src/enum/role.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([Categories, Comics, Users]),
    MembershipModule,
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    ComicsService,
    ComicsRepository,
    UsersRepository,
    MailerService,
    AuthService,
    UsersService,
  ],
})
export class CategoriesModule implements OnModuleInit {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
    private readonly comicsService: ComicsService,
  ) {}

  async onModuleInit() {
    const mainUser: CreateUserDto = {
      email: 'comicraft2024@gmail.com',
      name: 'ComiCraft',
      username: 'ComiCraft2024',
      dob: new Date('1999-07-27'),
      password: 'TestPassword1$',
      confirmPassword: 'TestPassword1$',
      address: 'Calle capitan america',
      phone: 1234567890,
      isDeleted: false,
    };

    const existingUser = await this.usersRepository.getUserByEmail(
      mainUser.email,
    );
    if (existingUser) {
      console.log(`El usuario con el correo ${mainUser.email} ya existe.`);
      return;
    }

    const createdUser = await this.authService.signUp(mainUser);
    await this.usersRepository.updateUserRole(createdUser.id, [Role.Admin]);
    await this.comicsService.addComics(createdUser.id);
  }
}
