import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import {
  CreateUserDto,
  LoginUserDto,
  CreateGoogleUserDto,
} from './dto/users.dto';
import { Role } from 'src/enum/role.enum';
import { Membership } from 'src/membership/membership.entity';
import { MembershipType } from 'src/enum/membership-type.enum';
import { MembershipsRepository } from 'src/membership/membership.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly mailerService: MailerService,
    @Inject(forwardRef(() => MembershipsRepository))
    private readonly membershipsRepository: MembershipsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getUsers(page?: number, limit?: number) {
    const skip = (page - 1) * limit;
    try {
      const users = await this.usersRepository.find({
        take: limit,
        skip: skip,
      });
      if (users.length < 1) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      /*  const activeUsers = users.filter((user) => user.isDeleted === false); */
      return users;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar los usuarios');
    }
  }

  async getDeletedUsers(page?: number, limit?: number) {
    const skip = (page - 1) * limit;
    try {
      const users = await this.usersRepository.find({
        take: limit,
        skip: skip,
      });
      if (users.length < 1) {
        throw new NotFoundException('No se encontraron usuarios');
      }
      const deletedUsers = users.filter((user) => user.isDeleted);
      /*  const activeUsers = users.filter((user) => user.isDeleted === false); */
      return deletedUsers;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al buscar los usuarios');
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          comics: true,
          memberships: true,
        },
      });
      if (!user) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      if (user.isDeleted) {
        return `Usuario con el id ${id} está bloqueado`;
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error al buscar el usuario');
    }
  }
  async getUserToken(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`El usuario con id ${id} no fue encontrado`);
    }
    const userMembership =
      await this.membershipsRepository.getUserMembershipById(user.id);

    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      MembershipType: userMembership ? userMembership.type : null,
    };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Nuevo token',
      token,
    };
  }

  async getUserByName(name?: string) {
    try {
      if (!name) {
        throw new NotFoundException(`No se encontró el usuario ${name}`);
      }
      return await this.usersRepository.findOneBy({ name });
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('Error al buscar el usuario');
    }
  }

  async createUser(user: CreateUserDto | CreateGoogleUserDto) {
    try {
      const existingUser = await this.usersRepository.findOneBy({
        phone: user.phone,
      });
      if (existingUser) {
        throw new BadRequestException(
          'El número de teléfono ya está registrado',
        );
      }

      const newUser = await this.usersRepository.save(user);

      // Intentar enviar el correo
      try {
        await this.mailerService.sendMail(
          newUser.email,
          '¡Bienvenido a ComiCraft!',
          `Hola ${newUser.name}, gracias por registrarte en ComiCraft`,
          `
          <html>
          <head>
            <style>
              body {
                font-family: 'Comic Sans MS', 'Comic Sans', cursive;
                background-color: #f2f2f2;
                margin: 0;
                padding: 0;
              }
              .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .header {
                background-color: #ffcc00;
                color: #333;
                text-align: center;
                padding: 20px 0;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                text-transform: uppercase;
                letter-spacing: 1.5px;
              }
              .content {
                padding: 20px;
                color: #333;
              }
              .content p {
                margin: 10px 0;
                line-height: 1.6;
              }
              .footer {
                text-align: center;
                padding: 10px 0;
                background-color: #ffcc00;
                color: #333;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                font-size: 12px;
              }
              .footer p {
                margin: 0;
              }
              .contenedorimg {
                text-align: center;
                margin: 20px 0;
              }
              .contenedorimg img.batman {
                max-width: 100%;
                height: auto;
              }
              .botoncreador {
                background-color: #ffcc00;
                color: #333;
                border: none;
                border-radius: 8px;
                padding: 10px 20px;
                cursor: pointer;
                font-size: 16px;
                margin-top: 10px;
              }
              .botoncreador:hover {
                background-color: #e6b800;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Bienvenido a ComiCraft!</h1>
              </div>
              <div class="content">
                <p>Hola ${newUser.name},</p>
                <p>¡Gracias por registrarte en ComiCraft! Estamos emocionados de tenerte con nosotros en esta aventura de cómics.</p>
                <p>En ComiCraft, podrás disfrutar de una amplia variedad de cómics y mangas. No dudes en explorar y descubrir nuevas historias.</p>
                <p>Si tienes alguna pregunta, no dudes en contactarnos. ¡Disfruta de la magia de los cómics!</p>
  
                <div class="contenedorimg">
                  <p>También queremos invitarte a que ¡TÚ!</p>
                  <img class="batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1722142238/Group_4_1_lvwly7.png">
                  <p>Te conviertas en el nuevo Autor estrella de ComiCraft para que la gente conozca tus mejores historias</p>
                  <button class="botoncreador" onclick="window.open('https://www.google.com', '_blank')">¡Únete!</button>
                </div>
              </div>
              <div class="footer">
                <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
              </div>
            </div>
          </body>
          </html>
          `,
        );
      } catch (mailError) {
        console.error('Error al enviar el correo:', mailError);
        throw new InternalServerErrorException(
          'Error al enviar el correo de bienvenida',
        );
      }
      const formattedUser = {
        ...newUser,
        dob: newUser.dob.toISOString().split('T')[0],
      };

      const { password, ...userWithoutPassword } = formattedUser;

      return userWithoutPassword;
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (
        error instanceof BadRequestException ||
        error instanceof InternalServerErrorException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(id: string, user: Partial<Users>) {
    try {

      //En caso de querer cambiar el password
      if(user.password){
        user.password = await bcrypt.hash(user.password, 10);
      }
      
      await this.usersRepository.update(id, user);
      const updateUser = await this.usersRepository.findOneBy({ id });
      if (!updateUser) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      return updateUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('No se pudo actualizar al usuario');
    }
  }

  async removeUser(id: string) {
    try {
      const deletedUser = await this.usersRepository.findOneBy({ id });
      if (!deletedUser) {
        throw new NotFoundException(
          `No se encontró nigún usuario con el id ${id}`,
        );
      }
      await this.usersRepository.delete(id);
      return deletedUser;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException('No se pudo eliminar al usuario');
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`Usuario con el ${id} no encontrado`);
      }

      await this.usersRepository
        .createQueryBuilder()
        .update(Users)
        .set({
          isDeleted: !user.isDeleted,
        })
        .where('id = :id', { id })
        .execute();

      if (!user.isDeleted) {
        return { message: `Usuario con el id ${id} bloqueado con éxito` };
      } else {
        return { message: `Usuario con el id ${id} desbloqueado con éxito` };
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async updateUserRole(id: string, role: Role[]): Promise<{ message: string }> {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(
          `No se encontró ningún usuario con el id proporcionado`,
        );
      }

      const validRoles = Object.values(Role);
      const invalidRoles = role.filter((r) => !validRoles.includes(r));
      if (invalidRoles.length > 0) {
        throw new BadRequestException(`Rol inválido`);
      }

      user.role = role;
      await this.usersRepository.save(user);
      return { message: 'Rol actualizado correctamente' };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error al actualizar el rol del usuario',
      );
    }
  }

  async updateProfilePicture(id: string, url: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(
          `No se encontro usuario con el id proporcionado`,
        );
      }

      user.profilePicture = url;
      await this.usersRepository.save(user);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Error al actualizar la foto de perfil',
      );
    }
  }
}
