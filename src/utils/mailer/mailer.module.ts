import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './controllers/mailer.controller';
import { MailerService } from './services/mailer.service';

@Module({
 imports: [ConfigModule],
 controllers: [MailerController],
 providers: [MailerService],
})
export class MailerModule {}
