import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateGoogleUserDto, CreateUserDto } from 'src/users/dto/users.dto';
import { MembershipsRepository } from 'src/membership/membership.repository';
import { MembershipType } from 'src/enum/membership-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly membershipsRepository: MembershipsRepository,
  ) {}

  async signIn(email: string, password: string) {
    console.log('inicio de sesion:', email, password);
    try {
      if (!email || !password)
        throw new BadRequestException('Email y password requeridos');

      const user = await this.usersRepository.getUserByEmail(email);
      if (!user) {
        console.log('Credenciales incorrectas: usuario no encontrado');
        throw new BadRequestException('Credenciales incorrectas');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      console.log('validando contraseña', validPassword);
      if (!validPassword) {
        console.log('Credenciales incorrectas: password no válido');
        throw new BadRequestException('Credenciales incorrectas');
      }

      const userMembership =
        await this.membershipsRepository.getUserMembershipById(user.id);
      console.log('membresia usuario', userMembership);

      if (!userMembership) {
        console.log(
          'No se encontró membresía para el usuario con id:',
          user.id,
        );
        console.log('error membresia', !userMembership);
      }
      console.log('userMembership:', userMembership);

      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        MembershipType: userMembership ? userMembership.type : null,
        profilePicture: user.profilePicture
      };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Usuario Logueado...',
        token,
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('No se pudo iniciar sesión');
    }
  }

  async signUp(user: CreateUserDto | CreateGoogleUserDto) {
    const { email, password } = user;
    try {
      if (!password)
        throw new BadRequestException('La contraseña es requerida');

      const foundUser = await this.usersRepository.getUserByEmail(email);
      if (foundUser)
        throw new BadRequestException('El correo ya está registrado');
      const hashedPassword = await bcrypt.hash(password, 10);

      return await this.usersRepository.createUser({
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Error al registrar al usuario');
    }
  }
}