import * as Buffer from 'buffer';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@utils/enums/role.enum';
import { MonopayService } from 'src/monopay/services/monopay.service';
import { Repository } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderEntity } from '../entities/order.entity';
import { GrowthOrderService } from './growthOrder.service';
import { SelfOrderService } from './selfOrder.service';
import { CreateShippingService } from './shipping.service';
import { IOrdersService } from './types/orders.service.types';
import { ZsuOrderService } from './zsuOrder.service';

@Injectable()
export class OrdersService {
 constructor(
  @InjectRepository(OrderEntity)
  private readonly orderRepository: Repository<OrderEntity>,
  private readonly shippingService: CreateShippingService,
  private readonly selfOrderService: SelfOrderService,
  private readonly zsuOrderService: ZsuOrderService,
  private readonly growthOrderService: GrowthOrderService,
  private readonly monopayService: MonopayService,
 ) {}

 async create(createOrderDto: CreateOrderDto, user: UserEntity): Promise<IOrdersService> {
  function checkItemsOrder(...arrays) {
   return arrays.some(array => Array.isArray(array) && array.length <= 0);
  }

  const order = new OrderEntity();
  order.user = user;
  order.totalAllPrice = 1;
  order.payment_reference = createOrderDto.payment_reference;

  const savedOrder = await this.orderRepository.save(order);

  let selfOrder, zsuOrder, growthOrder;

  try {
   if (createOrderDto.selfOrder) {
    selfOrder = await this.selfOrderService.createSelfOrder(createOrderDto.selfOrder, savedOrder.id);
   }
   if (createOrderDto.zsuOrder) {
    zsuOrder = await this.zsuOrderService.createZsuOrder(createOrderDto.zsuOrder, savedOrder.id);
   }
   if (createOrderDto.growthOrder) {
    growthOrder = await this.growthOrderService.createGrowthOrder(createOrderDto.growthOrder, savedOrder.id);
   }

   const shipping = await this.shippingService.createShipping(createOrderDto.shippingAddress, savedOrder.id, user.id);
   const addressCount = [shipping.personalAddress, shipping.novaPostLocker, shipping.novaPostOffice].filter(
    Boolean,
   ).length;

   if (!shipping) {
    throw new NotFoundException('Не можливо створити замовлення без адреси доставки.');
   }
   const isItems = checkItemsOrder(selfOrder?.itemsSelfOrder, zsuOrder?.itemsZsuOrder, growthOrder?.itemsGrowthOrder);
   if (isItems) {
    throw new NotFoundException('Не можливо створити замовлення без товарів.');
   }

   if (addressCount !== 1) {
    throw new NotFoundException('Ви повинні вказати рівно одну адресу доставки.');
   }

   if (selfOrder || zsuOrder || growthOrder) {
    savedOrder.selfOrder = selfOrder ? [selfOrder] : [];
    savedOrder.zsuOrder = zsuOrder ? [zsuOrder] : [];
    savedOrder.growthOrder = growthOrder ? [growthOrder] : [];
    savedOrder.shippingAddress = shipping;

    savedOrder.totalAllPrice =
     (selfOrder ? selfOrder.totalPrice : 0) +
     (zsuOrder ? zsuOrder.totalPrice : 0) +
     (growthOrder ? growthOrder.totalPrice : 0);
    await this.orderRepository.save(savedOrder);
    return { id: savedOrder.id, order: savedOrder, message: 'Замовлення успішно створено.' };
   } else {
    throw new NotFoundException('Не можливо зберегти замовлення без жодного підзамовлення.');
   }
  } catch (error) {
   await this.orderRepository.remove(savedOrder);
   if (error instanceof NotFoundException) {
    return { message: error.message };
   }
  }
 }

 async findAllSelfOrdersByUser(user: UserEntity) {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.selfOrder', 'selfOrder')
   .leftJoinAndSelect('selfOrder.itemsSelfOrder', 'itemsSelfOrder')
   .leftJoinAndSelect('itemsSelfOrder.product', 'selfProduct')
   .leftJoin('order.user', 'user')
   .where('user.id = :userId', { userId: user.id })
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname'])
   .addSelect(['shipping', 'selfOrder'])
   .addSelect(['itemsSelfOrder', 'selfProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllZsuOrdersByUser(user: UserEntity) {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.zsuOrder', 'zsuOrder')
   .leftJoinAndSelect('zsuOrder.itemsZsuOrder', 'itemsZsuOrder')
   .leftJoinAndSelect('itemsZsuOrder.product', 'zsuProduct')
   .leftJoin('order.user', 'user')
   .where('user.id = :userId', { userId: user.id })
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname'])
   .addSelect(['shipping', 'zsuOrder'])
   .addSelect(['itemsZsuOrder', 'zsuProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllGrowthOrdersByUser(user: UserEntity) {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.growthOrder', 'growthOrder')
   .leftJoinAndSelect('growthOrder.itemsGrowthOrder', 'itemsGrowthOrder')
   .leftJoinAndSelect('itemsGrowthOrder.product', 'growthProduct')
   .leftJoin('order.user', 'user')
   .where('user.id = :userId', { userId: user.id })
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname'])
   .addSelect(['shipping', 'growthOrder'])
   .addSelect(['itemsGrowthOrder', 'growthProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllOrders() {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoin('order.user', 'user')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.selfOrder', 'selfOrder')
   .leftJoinAndSelect('selfOrder.itemsSelfOrder', 'itemsSelfOrder')
   .leftJoinAndSelect('itemsSelfOrder.product', 'selfProduct')
   .leftJoinAndSelect('order.zsuOrder', 'zsuOrder')
   .leftJoinAndSelect('zsuOrder.itemsZsuOrder', 'itemsZsuOrder')
   .leftJoinAndSelect('itemsZsuOrder.product', 'zsuProduct')
   .leftJoinAndSelect('order.growthOrder', 'growthOrder')
   .leftJoinAndSelect('growthOrder.itemsGrowthOrder', 'itemsGrowthOrder')
   .leftJoinAndSelect('itemsGrowthOrder.product', 'growthProduct')
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname'])
   .addSelect(['shipping', 'selfOrder', 'zsuOrder', 'growthOrder'])
   .addSelect(['itemsSelfOrder', 'selfProduct'])
   .addSelect(['itemsZsuOrder', 'zsuProduct'])
   .addSelect(['itemsGrowthOrder', 'growthProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllSelfOrders() {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoin('order.user', 'user')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.selfOrder', 'selfOrder')
   .leftJoinAndSelect('selfOrder.itemsSelfOrder', 'itemsSelfOrder')
   .leftJoinAndSelect('itemsSelfOrder.product', 'selfProduct')
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname', 'user.email'])
   .addSelect(['shipping', 'selfOrder'])
   .addSelect(['itemsSelfOrder', 'selfProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllZsuOrders() {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.zsuOrder', 'zsuOrder')
   .leftJoinAndSelect('zsuOrder.itemsZsuOrder', 'itemsZsuOrder')
   .leftJoinAndSelect('itemsZsuOrder.product', 'zsuProduct')
   .leftJoin('order.user', 'user')
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname', 'user.email'])
   .addSelect(['shipping', 'zsuOrder'])
   .addSelect(['itemsZsuOrder', 'zsuProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findAllGrowthOrders() {
  return await this.orderRepository
   .createQueryBuilder('order')
   .leftJoinAndSelect('order.shippingAddress', 'shipping')
   .leftJoinAndSelect('order.growthOrder', 'growthOrder')
   .leftJoinAndSelect('growthOrder.itemsGrowthOrder', 'itemsGrowthOrder')
   .leftJoinAndSelect('itemsGrowthOrder.product', 'growthProduct')
   .leftJoin('order.user', 'user')
   .select(['order.id', 'order.orderAt', 'user.id', 'user.name', 'user.surname', 'user.email'])
   .addSelect(['shipping', 'growthOrder'])
   .addSelect(['itemsGrowthOrder', 'growthProduct'])
   .leftJoinAndSelect('order.payment_reference', 'payment')
   .getMany();
 }

 async findOne(id: number, user) {
  const result = await this.orderRepository.findOne({
   where: { id },
   relations: ['user'],
  });
  if (result.user.id !== user.id && !user.roles.includes(Role.ADMIN)) {
   throw new ForbiddenException('Ви не можете переглянути замовлення іншого користувача');
  }
  return result;
 }

 async remove(id: number) {
  return await this.orderRepository.delete(id);
 }

 async getStatusLiqPay(responseLiqPay) {
  const encodedString = responseLiqPay.data;
  const decodedString = Buffer.Buffer.from(encodedString, 'base64').toString('utf-8');
  const jsonObject = JSON.parse(decodedString);
  console.log('responseLiqPay-->', { orderId: jsonObject.order_id, status: jsonObject.status });
  const order = await this.orderRepository.findOne({ where: { id: jsonObject.order_id } });
  if (!order) {
   throw new Error('Order not found');
  }
  order.statusLiqPay = jsonObject.status;
  return await this.orderRepository.save(order);
 }
}
