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

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Comics, Users])],
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
    private readonly categoriesService: CategoriesService,
    private readonly comicsService: ComicsService,
  ) {}

  async onModuleInit() {
    const mainUser: CreateUserDto = {
      email: 'cidegeb293@leacore.com',
      name: 'Carlos',
      username: 'carletox',
      dob: new Date('1999-07-27'),
      password: 'TestPassword1$',
      confirmPassword: 'TestPassword1$',
      address: '123 Maple kjhk',
      phone: 1234567890,
    };

    await this.authService.signUp(mainUser);
    const createdUser = await this.usersRepository.getUserByEmail(
      mainUser.email,
    );
    await this.categoriesService.addCategories();
    await this.comicsService.addComics(createdUser.id);
  }
}
