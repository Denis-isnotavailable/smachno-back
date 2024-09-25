import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@src/entities/product.entity';
import { ProductsService } from '@src/services/products.service';
import { Repository } from 'typeorm';
import { CreateSelfOrderDto } from '../dto/create-self-order.dto';
import { ItemsOrderDto } from '../dto/items-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { ItemsSelfOrderEntity } from '../entities/items-self-order.entity';
import { ItemsZsuOrderEntity } from '../entities/items-zsu-order.entity';
import { SelfOrderEntity } from '../entities/self-order.entity';

@Injectable()
export class SelfOrderService {
 constructor(
  @InjectRepository(SelfOrderEntity)
  private readonly selfOrderRepository: Repository<SelfOrderEntity>,
  @InjectRepository(ItemsSelfOrderEntity)
  private readonly itemsSelfOrderRepository: Repository<ItemsSelfOrderEntity>,
  private readonly productServices: ProductsService,
 ) {}

 async createSelfOrder(selfOrderDto: CreateSelfOrderDto, orderId: number): Promise<SelfOrderEntity> {
  const selfOrder = new SelfOrderEntity();
  selfOrder.orderId = orderId;
  selfOrder.itemsSelfOrder = [];

  const itemsSelfOrder: ItemsOrderDto[] = selfOrderDto.items;
  let totalSelfOrderPrice = 0;

  for (const item of itemsSelfOrder) {
   const product: ProductEntity = await this.findProductById(item.productId);

   const itemsSelfOrder = new ItemsSelfOrderEntity();
   itemsSelfOrder.product = product;
   itemsSelfOrder.order_quantity = item.order_quantity;
   const productPrice = product.price;
   const selfTotalPrice = productPrice * itemsSelfOrder.order_quantity;
   totalSelfOrderPrice += selfTotalPrice;
   selfOrder.itemsSelfOrder.push(itemsSelfOrder);
  }
  selfOrder.totalPrice = totalSelfOrderPrice;

  return await this.selfOrderRepository.save(selfOrder);
 }

 async findProductById(id: number) {
  const product = await this.productServices.findOne(id);
  if (!product) {
   throw new NotFoundException(`Product with ID ${id} not found.`);
  }
  return product;
 }

 async updateStatusSelfOrder(updateStatusOrderDto: UpdateStatusOrderDto) {
  const { idOrder, idItemOrder, status } = updateStatusOrderDto;
  const selfOrder = await this.selfOrderRepository.findOne({
   where: { id: idOrder },
   relations: ['itemsSelfOrder'],
  });

  if (!selfOrder) {
   throw new Error('Order not found');
  }
  const item = selfOrder.itemsSelfOrder.find(item => item.id === idItemOrder);

  if (!item) {
   throw new Error('Item in order not found');
  }

  item.status = status;

  return await this.itemsSelfOrderRepository.save(item);
 }
}
