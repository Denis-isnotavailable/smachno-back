import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { CreateUserDeliveryAddressDto } from '../dto/create-user-delivery-address.dto';
import { UpdateUserDeliveryAddressDto } from '../dto/update-user-delivery-address.dto';
import { UserDeliveryAddressService } from '../services/user-delivery-address.service';

@ApiTags('Адреси доставки користувачів')
@Controller('address')
export class UserDeliveryAddressController {
 constructor(private readonly userDeliveryAddressService: UserDeliveryAddressService) {}

 @Post()
 @UseGuards(JwtAuthGuard)
 create(@Body() createUserDeliveryAddressDto: CreateUserDeliveryAddressDto, @Req() req) {
  return this.userDeliveryAddressService.create(createUserDeliveryAddressDto, +req.user.id);
 }

 @Get()
 @UseGuards(JwtAuthGuard)
 findAll(@Req() req) {
  return this.userDeliveryAddressService.findAll(+req.user.id);
 }

 @Get(':id')
 @UseGuards(JwtAuthGuard)
 findOne(@Param('id') id: string, @Req() req) {
  return this.userDeliveryAddressService.findOne(+id, req.user.id);
 }

 @Patch(':id')
 @UseGuards(JwtAuthGuard)
 update(@Param('id') id: string, @Body() updateUserDeliveryAddressDto: UpdateUserDeliveryAddressDto, @Req() req) {
  return this.userDeliveryAddressService.update(+id, updateUserDeliveryAddressDto, req.user.id);
 }

 @Delete(':id')
 @UseGuards(JwtAuthGuard)
 remove(@Param('id') id: string, @Req() req) {
  return this.userDeliveryAddressService.remove(+id, req.user.id);
 }
}
