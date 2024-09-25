import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { SendEmailDto } from '../intrefaces/mailer.interface';
import { MailerService } from '../services/mailer.service';

@ApiTags('Повідомлення на пошту')
@Controller('mailer')
export class MailerController {
 constructor(private readonly mailerService: MailerService) {}

 @UseGuards(JwtAuthGuard)
 @Post('/sendEmail')
 @ApiOperation({ summary: 'Інформація про замовлення' })
 async sendEmail(@Body() sendEmailDto: SendEmailDto) {
  return this.mailerService.sendEmail(sendEmailDto);
 }
}
