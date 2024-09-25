import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/services/users.service';
import { JwtAuthGuard } from '../../utils/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../utils/guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Аутентифікація та авторизація')
@Controller('auth')
export class AuthController {
 constructor(
  private readonly authService: AuthService,
  private readonly usersService: UsersService,
 ) {}
 @ApiOperation({ summary: 'Авторизація' })
 @UseGuards(LocalAuthGuard)
 @Post('login')
 async login(@Request() req) {
  return this.authService.login(req.user);
 }

 @ApiOperation({ summary: 'Профіль' })
 @UseGuards(JwtAuthGuard)
 @Get('profile')
 getProfile(@Request() req) {
  //  return req.user;
  return this.usersService.findOneById(+req.user.id);
 }
}
