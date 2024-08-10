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
      console.log('newUser=', newUserMembership);

      const userMembership =
        await this.membershipsRepository.save(newUserMembership);
      console.log('membershipRepository=', userMembership);

      user.memberships = userMembership;
      await this.usersRepositorySave.save(user);

      let subject: string;
      let text: string;
      let html: string;

      switch (type) {
        case MembershipType.MonthlyMember:
          subject = '¡Gracias por adquirir la membresía mensual!';
          text = `¡Hola ${user.username}! Gracias por unirte a nuestra membresía mensual.`;
          html = `<p>¡Hola ${user.username}! Gracias por unirte a nuestra <strong>membresía mensual</strong>.</p>`;
          break;
        case MembershipType.AnnualMember:
          subject = '¡Gracias por adquirir la membresía anual!';
          text = `¡Hola ${user.username}! Gracias por confiar en nosotros y adquirir la membresía anual.`;
          html = `<p>¡Hola ${user.username}! Gracias por confiar en nosotros y adquirir la <strong>membresía anual</strong>.</p>`;
          break;
        case MembershipType.Creator:
          subject = '¡Gracias por adquirir la membresía Creator!';
          text = `¡Hola ${user.username}! Bienvenido a la membresía Creator. Estamos emocionados de tenerte con nosotros.`;
          html = `<p>¡Hola ${user.username}! Bienvenido a la <strong>membresía Creator</strong>. Estamos emocionados de tenerte con nosotros.</p>`;
          break;
        default:
          throw new BadRequestException('Tipo de membresía no válido');
      }

      await this.mailerService.sendMail(user.email, subject, text, html);

      return `Membresía adquirida, id ${userMembership.id}`;
    } catch (error) {
      console.log(error);
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
      /* const activeMemberships = memberships.filter(
        (membership) => membership.isDeleted === false,
      ); */

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
        console.log(
          `No se encontró membresía para el usuario con id: ${userId}`,
        );
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
    console.log('updateMembershipDTO=', updateMembershipDto);
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
