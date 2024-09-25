import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerService } from '@utils/mailer/services/mailer.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
 imports: [
  TypeOrmModule.forFeature([UserEntity]),
  JwtModule.registerAsync({
   imports: [ConfigModule],
   useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '30d' },
   }),
   inject: [ConfigService],
  }),
 ],
 controllers: [UsersController],
 providers: [UsersService, MailerService],
 exports: [UsersService],
})
export class UsersModule {}
