import {
 Body,
 Controller,
 Delete,
 Get,
 HttpCode,
 HttpException,
 HttpStatus,
 Param,
 Patch,
 Post,
 Query,
 Req,
 UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { PageOptionsDto } from '@utils/pagination/dto/page-options.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Аутентифікація та авторизація')
@Controller('user')
export class UsersController {
 constructor(private readonly usersService: UsersService) {}

 @Post('register')
 @ApiOperation({ summary: 'Реєстрація' })
 create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Get()
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ summary: 'Отримати всіх користувачів' })
 async findAll(@Query() pageOptionsDto: PageOptionsDto) {
  return this.usersService.findAll(pageOptionsDto);
 }

 @UseGuards(JwtAuthGuard, RolesGuard)
 @Patch(':id')
 @ApiOperation({ summary: 'Оновити користувача' })
 async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Req() req) {
  if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
   throw new HttpException({ message: 'Ви не можете оновити іншого користувача' }, HttpStatus.FORBIDDEN);
  }
  return this.usersService.update(id, updateUserDto, req.user.id);
 }

 @UseGuards(JwtAuthGuard, RolesGuard)
 @Delete(':id')
 @ApiOperation({ summary: 'Видалити користувача(Тимчасово не працює)' })
 async remove(@Param('id') id: number, @Req() req) {
  if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
   throw new HttpException({ message: 'Ви не можете видалити іншого користувача' }, HttpStatus.FORBIDDEN);
  }
  return this.usersService.remove(id);
 }

 @UseGuards(JwtAuthGuard, RolesGuard)
 @Get('profile/:id')
 findOneById(@Param('id') id: number, @Req() req) {
  if (req.user.id !== id && !req.user.roles.includes(Role.ADMIN)) {
   throw new HttpException({ message: 'Ви не можете переглянути іншого користувача' }, HttpStatus.FORBIDDEN);
  }
  return this.usersService.findOneById(+id);
 }

 @UseGuards(JwtAuthGuard, RolesGuard)
 @Patch('password/:id')
 async changePassword(@Param('id') id: number, @Body() data: UpdatePasswordDto) {
  return this.usersService.changePassword(id, data.password, data.newPassword);
 }
 @Post('newPassword')
 @ApiOperation({ summary: 'Оновлення паролю' })
 async newPassword(@Body() data: { email: string }): Promise<any> {
  return this.usersService.newPassword(data.email);
 }
}
