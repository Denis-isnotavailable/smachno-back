import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDeliveryAddressDto } from '../dto/create-user-delivery-address.dto';
import { UpdateUserDeliveryAddressDto } from '../dto/update-user-delivery-address.dto';
import { UserDeliveryAddressEntity } from '../entities/user-delivery-address.entity';

@Injectable()
export class UserDeliveryAddressService {
 constructor(
  @InjectRepository(UserDeliveryAddressEntity)
  private readonly addressRepository: Repository<UserDeliveryAddressEntity>,
 ) {}
 async create(createUserDeliveryAddressDto: CreateUserDeliveryAddressDto, id: number) {
  const { novaPostOffice, novaPostLocker, personalAddress } = createUserDeliveryAddressDto;

  if (
   (novaPostOffice && novaPostLocker) ||
   (novaPostOffice && personalAddress) ||
   (novaPostLocker && personalAddress)
  ) {
   throw new BadRequestException('Only one of novaPostOffice, novaPostLocker, or personalAddress should be provided');
  }
  const isExist = await this.addressRepository.findBy({
   user: { id },
   title: createUserDeliveryAddressDto.title,
  });
  if (isExist.length) throw new BadRequestException('Address with this title already exists');

  const isMaxLength = await this.addressRepository.findBy({ user: { id } });
  if (isMaxLength.length >= 3) throw new BadRequestException('Reached max number of addresses - 3');

  const newAddress = {
   user: { id },
   title: createUserDeliveryAddressDto.title,
   firstName: createUserDeliveryAddressDto.firstName,
   surname: createUserDeliveryAddressDto.surname,
   phone: createUserDeliveryAddressDto.phone,
   area: createUserDeliveryAddressDto.area,
   city: createUserDeliveryAddressDto.city,
   novaPostOffice: createUserDeliveryAddressDto.novaPostOffice,
   novaPostLocker: createUserDeliveryAddressDto.novaPostLocker,
   personalAddress: createUserDeliveryAddressDto.personalAddress,
  };
  return await this.addressRepository.save(newAddress);
 }

 async findAll(userId: number) {
  return await this.addressRepository.find({
   where: { user: { id: userId } },
  });
 }

 async findOne(id: number, userId: number) {
  if (isNaN(id) || isNaN(userId)) {
   throw new BadRequestException('Invalid id or userId');
  }

  const address = await this.addressRepository.findOne({
   where: { id: id, user: { id: userId } },
   relations: { user: true },
  });

  if (!address) {
   throw new NotFoundException('Address not found');
  }

  return address;
 }

 async update(id: number, updateUserDeliveryAddressDto: UpdateUserDeliveryAddressDto, userId: number) {
  const address = await this.addressRepository.findOne({
   where: { id, user: { id: userId } },
  });
  if (!address) throw new NotFoundException('Address not found');

  const { novaPostOffice, novaPostLocker, personalAddress } = updateUserDeliveryAddressDto;

  if (
   (novaPostOffice && novaPostLocker) ||
   (novaPostOffice && personalAddress) ||
   (novaPostLocker && personalAddress)
  ) {
   throw new BadRequestException('Only one of novaPostOffice, novaPostLocker, or personalAddress should be provided');
  }

  return await this.addressRepository.update(id, {
   ...updateUserDeliveryAddressDto,
   novaPostOffice: novaPostOffice || null,
   novaPostLocker: novaPostLocker || null,
   personalAddress: personalAddress || null,
  });
 }

 async remove(id: number, userId: number) {
  const address = await this.addressRepository.findOne({
   where: { id, user: { id: userId } },
  });
  if (!address) throw new NotFoundException('Address not found');
  return await this.addressRepository.delete(id);
 }
}
