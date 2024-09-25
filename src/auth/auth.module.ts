import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
 imports: [
  UsersModule,
  PassportModule,
  JwtModule.registerAsync({
   imports: [ConfigModule],
   useFactory: (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET'),
    signOptions: { expiresIn: '30d' },
   }),
   inject: [ConfigService],
  }),
 ],
 controllers: [AuthController],
 providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
