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
    cron.schedule('30 14 * * *', () => {
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
                        background-color: #ff0000;
                        color: #ffffff;
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
                        background-color: #ff0000;
                        color: #ffffff;
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
                        <h1>¡Tu membresía está por vencer!</h1>
                      </div>
                      <div class="content">
                        <p>Hola ${user.username},</p>
                        <p>Queremos recordarte que tu membresía en ComiCraft está por vencer. ¡No pierdas acceso a todos los increíbles cómics y mangas que ofrecemos!</p>
                        <p>Te invitamos a renovar tu membresía para seguir disfrutando de nuestras historias. ¡No dejes que la diversión termine!</p>
            
                        <div class="contenedorimg">
                          <p>¡No abandones una historia épica a medio camino! </p>
                          <img class="batman" src="https://res.cloudinary.com/dyeji7bvg/image/upload/v1723527437/Group_14_xytobf.png">
                          <p>Renueva tu membresía ahora y sigue disfrutando de tus aventuras sin interrupciones.</p>
                          <button class="botoncreador" onclick="window.open('https://www.tu-url.com/renovar', '_blank')">Inicio</button>
                        </div>
                      </div>
                      <div class="footer">
                        <p>&copy; 2024 ComiCraft. Todos los derechos reservados.</p>
                      </div>
                    </div>
                  </body>
                </html>`,
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
