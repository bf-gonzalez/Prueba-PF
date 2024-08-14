import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { UsersRepository } from 'src/users/users.repository';
import { CreateMembershipDto, UpdateMembershipDto } from './membership.dto';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { MembershipType } from 'src/enum/membership-type.enum';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class MembershipsRepository {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>,
    @Inject(forwardRef(() => UsersRepository))
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
    @InjectRepository(Users)
    private readonly usersRepositorySave: Repository<Users>,
  ) {}
  private membershipsTypes(type: MembershipType, created_at: Date): Date {
    const expiration_date: Date = new Date(created_at);
    switch (type) {
      case MembershipType.MonthlyMember:
        expiration_date.setMonth(expiration_date.getMonth() + 1);
        break;
      case MembershipType.AnnualMember:
        expiration_date.setFullYear(expiration_date.getFullYear() + 1);
        break;
      case MembershipType.Creator:
        expiration_date.setMonth(expiration_date.getMonth() + 2);
        break;
      default:
        throw new BadRequestException('Membresía no válida');
    }
    return expiration_date;
  }

  async addMembership(createMembershipDto: CreateMembershipDto) {
    const { email, type, created_at, payment_date, price } =
      createMembershipDto;
    try {
      const founduser = await this.usersRepository.getUserByEmail(email);
      if (!founduser) {
        throw new NotFoundException('El usuario no está registrado');
      }
      const { address, password, name, dob, phone, ...user } = founduser;
      const expiration_date = this.membershipsTypes(type, created_at);

      const newUserMembership = {
        type,
        created_at,
        payment_date,
        price,
        expiration_date,
        user,
      };

      const userMembership =
        await this.membershipsRepository.save(newUserMembership);

      user.memberships = userMembership;
      await this.usersRepositorySave.save(user);

      let subject: string;
      let text: string;
      let html: string;

      switch (type) {
        case MembershipType.MonthlyMember:
          subject = '¡Gracias por adquirir la membresía mensual!';
          text = `¡Hola ${user.username}! Gracias por unirte a nuestra membresía mensual.`;
          html = `
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
                  <h1>¡Gracias por adquirir la Membresía Mensual!</h1>
                </div>
                <div class="content">
                  <p>Hola ${user.username},</p>
                  <p>¡Gracias por unirte a nuestra membresía mensual en ComiCraft! Durante este mes, podrás disfrutar de todos los cómics disponibles en nuestra plataforma.</p>
                  <p>Explora, descubre y sumérgete en las historias que tenemos para ti. ¡Estamos seguros de que encontrarás tus favoritos!</p>
        
                  <div class="contenedorimg">
                    <p>Comienza a disfrutar de los cómics ahora mismo:</p>
                    <img class="batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1723517901/Group_13_1_jaudze.png">
                    <p>Haz clic en el botón a continuación para empezar a leer.</p>
                    <button class="botoncreador" onclick="window.open('https://www.tu-url.com/comics', '_blank')">Comics</button>
                  </div>
                </div>
                <div class="footer">
                  <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </html>`;
          break;
        case MembershipType.AnnualMember:
          subject = '¡Gracias por adquirir la membresía anual!';
          text = `¡Hola ${user.username}! Gracias por confiar en nosotros y adquirir la membresía anual.`;
          html = `
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
                  <h1>¡Gracias por adquirir la Membresía Anual!</h1>
                </div>
                <div class="content">
                  <p>Hola ${user.username},</p>
                  <p>¡Gracias por unirte a la membresía anual de ComiCraft! Ahora tendrás acceso ilimitado a todos los cómics en nuestra plataforma durante todo un año.</p>
                  <p>Estamos emocionados de que disfrutes de nuestra extensa colección de cómics y mangas. ¡Explora, descubre y sumérgete en las mejores historias que ComiCraft tiene para ofrecer!</p>
        
                  <div class="contenedorimg">
                    <p>Comienza a disfrutar de los cómics ahora mismo:</p>
                    <img class="batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1723517152/Group_11_ujqzlc.png">
                    <p>Haz clic en el botón a continuación para empezar a leer.</p>
                    <button class="botoncreador" onclick="window.open('https://www.tu-url.com/comics', '_blank')">Comics</button>
                  </div>
                </div>
                <div class="footer">
                  <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </html>`;
          break;
        case MembershipType.Creator:
          subject = '¡Gracias por adquirir la membresía Creator!';
          text = `¡Hola ${user.username}! Bienvenido a la membresía Creador. Estamos emocionados de tenerte con nosotros.`;
          html = `
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
                  <h1>¡Bienvenido a la Membresía de Creador!</h1>
                </div>
                <div class="content">
                  <p>Hola ${user.username},</p>
                  <p>¡Gracias por adquirir la membresía de Creador! Estamos emocionados de tenerte con nosotros y esperamos con ansias tus nuevas historias.</p>
                  <p>En ComiCraft, valoramos tu creatividad y queremos que compartas tus mejores cómics con nuestra comunidad. ¡Estamos seguros de que serás una estrella en nuestro mundo de cómics!</p>
        
                  <div class="contenedorimg">
                    <p>Comienza tu aventura como creador:</p>
                    <img class="batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1723509050/Group_7_1_h8ejct.png">
                    <p>Haz clic en el botón a continuación para empezar a crear y compartir tus mejores historias.</p>
                    <button class="botoncreador" onclick="window.open('https://www.tu-url.com', '_blank')">¡Inicio!</button>
                  </div>
                </div>
                <div class="footer">
                  <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
          </html>`;
          break;
        default:
          throw new BadRequestException('Tipo de membresía no válido');
      }

      await this.mailerService.sendMail(user.email, subject, text, html);

      return `Membresía adquirida, id ${userMembership.id}`;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async getMerberships() {
    try {
      const memberships = await this.membershipsRepository
        .createQueryBuilder('membership')
        .leftJoinAndSelect('membership.user', 'user')
        .select(['membership', 'user.id'])
        .getMany();

      return memberships;
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener las membresías');
    }
  }

  async getDeletedMemberships() {
    try {
      const memberships = await this.membershipsRepository
        .createQueryBuilder('membership')
        .leftJoinAndSelect('membership.user', 'user')
        .select(['membership', 'user.id'])
        .getMany();
      const deletedMemberships = memberships.filter(
        (membership) => membership.isDeleted,
      );
      return deletedMemberships;
    } catch (error) {
      throw new BadRequestException(
        `Error al obtener las membresías bloqueadas`,
      );
    }
  }

  async getMembershipById(id: string) {
    try {
      const membership = await this.membershipsRepository
        .createQueryBuilder('membership')
        .leftJoinAndSelect('membership.user', 'user')
        .select(['membership', 'user.id'])
        .where('membership.id = :id', { id })
        .getOne();

      if (!membership) {
        throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
      }
      if (membership.isDeleted) {
        return `Membresía con el id ${id} está bloqueada`;
      }
      return membership;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async getUserMembershipById(userId: string) {
    try {
      const membership = await this.membershipsRepository
        .createQueryBuilder('membership')
        .leftJoinAndSelect('membership.user', 'user')
        .select(['membership', 'user.id'])
        .where('user.id = :userId', { userId })
        .getOne();
      if (!membership) {
        return null;
      }
      return membership;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async removeMembership(id: string) {
    const membership = await this.membershipsRepository.findOneBy({ id });
    if (!membership) {
      throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
    }
    try {
      const user = await this.usersRepositorySave.findOne({
        where: { memberships: { id } },
      });
      if (user) {
        user.memberships = null;
        await this.usersRepositorySave.save(user);
      }
      await this.membershipsRepository
        .createQueryBuilder()
        .delete()
        .from(Membership)
        .where('id = :id', { id })
        .execute();
      return 'Membersía eliminada con éxito';
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('No se pudo elimar la membresía');
    }
  }

  async deleteMembership(id: string) {
    try {
      const membership = await this.membershipsRepository.findOneBy({ id });
      if (!membership) {
        throw new NotFoundException(`Membresía con el ${id} no encontrada`);
      }

      await this.membershipsRepository
        .createQueryBuilder()
        .update(Membership)
        .set({
          isDeleted: !membership.isDeleted,
        })
        .where('id = :id', { id })
        .execute();
      if (!membership.isDeleted) {
        return { message: `Membresía con el id ${id} bloqueada con éxito` };
      } else {
        return { message: `Membresía con el id ${id} desbloqueada con éxito` };
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new BadRequestException();
    }
  }

  async updateMembership(id: string, updateMembershipDto: UpdateMembershipDto) {
    const { type, created_at } = updateMembershipDto;
    try {
      const foundMembership = await this.membershipsRepository.findOneBy({
        id,
      });
      if (!foundMembership) {
        throw new NotFoundException(`Membresía con el id ${id} no encontrada`);
      }
      const expiration_date = this.membershipsTypes(type, created_at);
      const updatedMembership = await this.membershipsRepository
        .createQueryBuilder()
        .update(Membership)
        .set({
          type: updateMembershipDto.type,
          price: updateMembershipDto.price,
          created_at: updateMembershipDto.created_at,
          payment_date: updateMembershipDto.payment_date,
          expiration_date,
        })
        .where('id = :id', { id })
        .execute();
      if (!updatedMembership) {
        throw new BadRequestException(
          `No fue posible actualizar la membresía con el id ${id}`,
        );
      }
      return `Membersía actualizada con éxito`;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      if (error instanceof BadRequestException) throw error;
    }
    throw new InternalServerErrorException();
  }
}
