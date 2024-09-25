import * as crypto from 'crypto';
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@utils/mailer/services/mailer.service';
import { PageMetaDto } from '@utils/pagination/dto/page-meta.dto';
import { PageOptionsDto } from '@utils/pagination/dto/page-options.dto';
import { PageDto } from '@utils/pagination/dto/page.dto';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
 constructor(
  @InjectRepository(UserEntity)
  private usersRepository: Repository<UserEntity>,
  private readonly jwtService: JwtService,
  private readonly mailerService: MailerService,
 ) {}

 async create(createUserDto: CreateUserDto) {
  const emailInLowerCase = createUserDto.email.toLowerCase();

  const existUserByEmail = await this.usersRepository.findOne({ where: { email: emailInLowerCase } });

  if (existUserByEmail) {
   throw new BadRequestException('User with this email already exists');
  }

  let existUserByPhone: UserEntity;
  if (createUserDto.phone !== null && createUserDto.phone !== undefined) {
   existUserByPhone = await this.usersRepository.findOne({ where: { phone: createUserDto.phone } });
  }

  if (existUserByPhone) {
   throw new BadRequestException('User with this phone number already exists');
  }

  const user = await this.usersRepository.save({
   email: emailInLowerCase,
   password: await argon2.hash(createUserDto.password),
   phone: createUserDto.phone,
   name: createUserDto.name,
   surname: createUserDto.surname,
   messenger: createUserDto.messenger,
  });

  const token = this.jwtService.sign({
   id: user.id,
   email: user.email,
   name: user.name,
   surname: user.surname,
   phone: user.phone,
   roles: user.roles,
  });

  return { email: user.email, name: user.name, surname: user.surname, token };
 }

 async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
  const queryBuilder = this.usersRepository.createQueryBuilder('user');
  queryBuilder
   .leftJoinAndSelect('user.deliveryAddresses', 'deliveryAddresses')
   .leftJoinAndSelect('user.orders', 'allOrders')
   .orderBy('user.createdAt', pageOptionsDto.order)
   .skip(pageOptionsDto.skip)
   .take(pageOptionsDto.take);

  const [entities, itemCount] = await queryBuilder.getManyAndCount();

  const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

  return new PageDto<UserEntity>(entities, pageMetaDto);
 }

 async update(id: number, updateUserDto: UpdateUserDto, userIdFromToken: number) {
  const user = await this.usersRepository.findOne({ where: { id } });

  if (!user) {
   throw new NotFoundException(`User with ID ${id} not found`);
  }

  if (id !== userIdFromToken) {
   throw new ForbiddenException('You can only update your own account');
  }

  const existUserByEmail = await this.usersRepository.findOne({ where: { email: updateUserDto.email } });

  if (existUserByEmail && existUserByEmail.id !== id) {
   throw new BadRequestException('User with this email already exists');
  }

  const existUserByPhone = await this.usersRepository.findOne({ where: { phone: updateUserDto.phone } });

  if (existUserByPhone && existUserByPhone.id !== id) {
   throw new BadRequestException('User with this phone number already exists');
  }

  if ('roles' in updateUserDto) {
   throw new ForbiddenException('Changing roles is not allowed');
  }

  for (const key in updateUserDto) {
   if (updateUserDto.hasOwnProperty(key) && updateUserDto[key] !== undefined && key !== 'password') {
    user[key] = updateUserDto[key];
   }
  }

  return await this.usersRepository.save(user);
 }

 async findOneByEmail(email: string) {
  return await this.usersRepository.findOne({ where: { email } });
 }

 async remove(id: number) {
  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) {
   throw new NotFoundException(`User with ID ${id} not found`);
  }

  const deletedUser = await this.usersRepository.remove(user);
  return {
   message: 'User deleted successfully',
   user: deletedUser,
  };
 }

 async findOneById(id: number) {
  return await this.usersRepository.findOne({ where: { id } });
 }

 async changePassword(id: number, password: string, newPassword: string) {
  const user = await this.usersRepository.findOne({ where: { id } });
  if (!user) {
   throw new NotFoundException(`User with ID ${id} not found`);
  }

  if (!password || !newPassword) {
   throw new BadRequestException(`"password" and "newPassword" arguments have to be provided`);
  }

  const passwordIsMatch = await argon2.verify(user.password, password);
  if (!passwordIsMatch) {
   throw new BadRequestException('Password is incorrect');
  }

  const newPasswordIsSameAsOld = await argon2.verify(user.password, newPassword);
  if (newPasswordIsSameAsOld) {
   throw new BadRequestException('New password cannot be identical to the old password');
  }

  user.password = await argon2.hash(newPassword);
  user.datePassword = null;
  await this.usersRepository.save(user);

  const token = this.jwtService.sign({
   id: user.id,
   email: user.email,
   name: user.name,
   surname: user.surname,
   phone: user.phone,
   roles: user.roles,
  });

  return {
   message: 'Password changed successfully',
   token,
  };
 }

 async newPassword(email: string) {
  const user = await this.usersRepository.findOne({ where: { email } });
  if (!user) {
   throw new NotFoundException(`User with email ${email} not found`);
  }
  const newPassword = crypto.randomBytes(8).toString('hex');
  user['password'] = await argon2.hash(newPassword);
  user.datePassword = new Date().toISOString();

  await this.usersRepository.save(user);

  await this.mailerService.sendNewPassword(email, newPassword);

  return {
   message: 'Create new password successfully',
  };
 }
}
