import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import * as nodemailer from 'nodemailer';

dotenvConfig({ path: '.development.env' });

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Aceptar certificados autofirmados
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    const mailOptions = {
      from: 'comicraft2024',
      to,
      subject,
      text,
      html,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
