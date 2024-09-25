import * as path from 'path';
import * as process from 'process';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
const hbs = require('nodemailer-express-handlebars');

@Injectable()
export class MailerService {
 constructor(private readonly configService: ConfigService) {}

 mailTransport() {
  const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
    user: this.configService.get<string>('MAIL_USER'),
    pass: this.configService.get<string>('MAIL_PASSWORD'),
   },
  });

  const handlebarOptions = {
   viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('src/utils/mailer/services/views'),
    defaultLayout: false,
   },
   viewPath: path.resolve('src/utils/mailer/services/views'),
   extName: '.handlebars',
  };

  return transporter.use('compile', hbs(handlebarOptions));
 }

 async sendEmail(sendEmailDto) {
  const from = {
   name: this.configService.get<string>('APP_NAME'),
   address: this.configService.get<string>('MAIL_USER'),
  };

  const transport = this.mailTransport();
  const options = {
   from: from,
   to: [sendEmailDto.email, process.env.MAIL_USER],
   subject: 'Пошта від Рудого!',
   template: 'email',
   context: {
    cartProducts: sendEmailDto.cartProducts,
    totalPrice: sendEmailDto.totalPrice,
    surname: sendEmailDto.surname,
    name: sendEmailDto.name,
    phone: sendEmailDto.phone,
    city: sendEmailDto.city,
    office: sendEmailDto.office,
    box: sendEmailDto.box,
    address: sendEmailDto.address,
    numberOrder: sendEmailDto.numberOrder,
    area: sendEmailDto.area,
   },
   attachments: [
    {
     filename: '13b733777fa7d261dfe87b6b902fb83b_d5ldwe.webp',
     path: 'https://res.cloudinary.com/dri4ndedq/image/upload/v1709490278/mail/eho55ihh6ee9e3uacu5z.png',
     cid: 'imagename',
    },
   ],
  };

  try {
   const res = await transport.sendMail(options);
   return {
    message: 'Інформація про замовлення відправлена на пошту',
    successful: res.response,
    failed: res.rejected,
   };
  } catch (e) {
   console.log('sendEmail Error: ', e);
  }
 }

 async sendNewPassword(email: string, password: string) {
  const from = {
   name: this.configService.get<string>('APP_NAME'),
   address: this.configService.get<string>('MAIL_USER'),
  };

  const transport = this.mailTransport();
  const options = {
   from: from,
   to: [email],
   subject: 'Пошта від Рудого!',
   template: 'newPassword',
   context: {
    password,
   },
   attachments: [
    {
     filename: '13b733777fa7d261dfe87b6b902fb83b_d5ldwe.webp',
     path: 'https://res.cloudinary.com/dri4ndedq/image/upload/v1712509949/mail/hkt0u2xhb3on4qgyoljv.png',
     cid: 'imagename',
    },
   ],
  };

  try {
   const res = await transport.sendMail(options);
   return {
    message: 'Новий пароль відправлено на пошту',
    successful: res.response,
    failed: res.rejected,
   };
  } catch (e) {
   console.log('sendEmail Error: ', e);
  }
 }
}
