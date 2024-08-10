import { Injectable } from '@nestjs/common';
import { MembershipsRepository } from 'src/membership/membership.repository';
import { UsersRepository } from 'src/users/users.repository';
import * as cron from 'node-cron';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class CronService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly membershipsRepository: MembershipsRepository,
    private readonly mailerService: MailerService,
  ) {
    this.scheduleMembershipCheck();
  }
  scheduleMembershipCheck() {
    cron.schedule('40 14 * * *', () => {
      console.log('ejecutando');
      this.checkMemberships();
    });
  }

  async checkMemberships() {
    try {
      const users = await this.usersRepository.getUsers(1, 10);
      //const memberships = await this.membershipsRepository.getMerberships();
      //console.log('membreasíasCrono', memberships);
      users.forEach(async (user) => {
        const membership =
          await this.membershipsRepository.getUserMembershipById(user.id);

        if (membership) {
          const today = new Date();
          const expiryDate = new Date(membership.expiration_date);
          const timeDiff = expiryDate.getTime() - today.getTime();
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          if (daysDiff <= 40) {
            await this.mailerService.sendMail(
              user.email,
              'tu membersía está por vencer ',
              'te invitamos a renovar tu membresía ',
            );
            console.log(membership.user.email);
          }
        }
      });
    } catch (error) {
      console.error('error al comprobar las membresias:', error);
    }
  }
}
