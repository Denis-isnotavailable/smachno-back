import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingDto } from '../dto/shipping.dto';
import { ShippingEntity } from '../entities/shipping.entity';

export class CreateShippingService {
 constructor(
  @InjectRepository(ShippingEntity)
  private readonly shippingRepository: Repository<ShippingEntity>,
 ) {}

 async createShipping(shippingDto: ShippingDto, orderId: number, userId: number): Promise<ShippingEntity> {
  if (!orderId) {
   return null;
  }

  const { novaPostLocker, novaPostOffice, personalAddress, firstName, surname, phone, city } = shippingDto;

  const shipping = new ShippingEntity();
  shipping.orderId = orderId;
  shipping.userId = userId;
  shipping.firstName = firstName;
  shipping.surname = surname;
  shipping.phone = phone;
  shipping.city = city;
  shipping.novaPostLocker = novaPostLocker;
  shipping.novaPostOffice = novaPostOffice;
  shipping.personalAddress = personalAddress;

  return await this.shippingRepository.save(shipping);
 }
}
