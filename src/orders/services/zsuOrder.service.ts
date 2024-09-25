import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@src/entities/product.entity';
import { ProductsService } from '@src/services/products.service';
import { Repository } from 'typeorm';
import { CreateZsuOrderDto } from '../dto/create-zsu-order.dto';
import { ItemsOrderDto } from '../dto/items-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { ItemsZsuOrderEntity } from '../entities/items-zsu-order.entity';
import { ZsuOrderEntity } from '../entities/zsu-order.entity';

@Injectable()
export class ZsuOrderService {
 constructor(
  @InjectRepository(ZsuOrderEntity)
  private readonly zsuOrderRepository: Repository<ZsuOrderEntity>,
  @InjectRepository(ItemsZsuOrderEntity)
  private readonly itemsZsuOrderRepository: Repository<ItemsZsuOrderEntity>,
  private readonly productServices: ProductsService,
 ) {}

 async createZsuOrder(zsuOrderDto: CreateZsuOrderDto, orderId: number): Promise<ZsuOrderEntity> {
  const zsuOrder = new ZsuOrderEntity();
  zsuOrder.orderId = orderId;
  zsuOrder.itemsZsuOrder = [];

  const itemsZsuOrder: ItemsOrderDto[] = zsuOrderDto.items;
  let totalZsuOrderPrice = 0;

  for (const zsuItem of itemsZsuOrder) {
   const product: ProductEntity = await this.findProductById(zsuItem.productId);

   const newItemZsuOrder = new ItemsZsuOrderEntity();
   newItemZsuOrder.product = product;
   newItemZsuOrder.order_quantity = zsuItem.order_quantity;
   const productPrice = product.price;
   const zsuTotalPrice = productPrice * newItemZsuOrder.order_quantity;
   totalZsuOrderPrice += zsuTotalPrice;
   zsuOrder.itemsZsuOrder.push(newItemZsuOrder); // Використано нову назву змінної
  }
  zsuOrder.totalPrice = totalZsuOrderPrice;

  return await this.zsuOrderRepository.save(zsuOrder);
 }
 async findProductById(id: number) {
  const product = await this.productServices.findOne(id);
  if (!product) {
   throw new NotFoundException(`Product with ID ${id} not found.`);
  }
  return product;
 }

 async updateStatusZsuOrder(updateStatusOrderDto: UpdateStatusOrderDto) {
  const { idOrder, idItemOrder, status } = updateStatusOrderDto;
  const zsuOrder = await this.zsuOrderRepository.findOne({
   where: { id: idOrder },
   relations: ['itemsZsuOrder'],
  });

  if (!zsuOrder) {
   throw new Error('Order not found');
  }
  const item = zsuOrder.itemsZsuOrder.find(item => item.id === idItemOrder);

  if (!item) {
   throw new Error('Item in order not found');
  }

  item.status = status;

  return await this.itemsZsuOrderRepository.save(item);
 }
}
