import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { subtractionDates } from '@utils/help/date-subtraction';
import { IUser } from '@utils/types/types';
import * as argon2 from 'argon2';
import { UsersService } from '../../users/services/users.service';
@Injectable()
export class AuthService {
 constructor(
  private readonly usersService: UsersService,
  private jwtService: JwtService,
 ) {}

 async validateUser(email: string, password: string): Promise<any> {
  const normalizedEmail = email.toLowerCase();

  const user = await this.usersService.findOneByEmail(normalizedEmail);
  if (!user) {
   throw new UnauthorizedException('User not found');
  }
  const passwordIsMatch = await argon2.verify(user.password, password);
  if (!passwordIsMatch) {
   throw new UnauthorizedException('password is incorrect');
  }
  if (user.datePassword) {
   if (!subtractionDates(user.datePassword)) {
    throw new UnauthorizedException('password is expired');
   }
  }
  return user;
 }

 async login(user: IUser) {
  const { id, email, name, surname, phone, roles } = user;
  return {
   token: this.jwtService.sign({
    id: id,
    email: email,
    name: name,
    surname: surname,
    phone: phone,
    roles: roles,
   }),
  };
 }
}
