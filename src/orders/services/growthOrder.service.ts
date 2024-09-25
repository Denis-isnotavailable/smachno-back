import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '@src/entities/product.entity';
import { ProductsService } from '@src/services/products.service';
import { Repository } from 'typeorm';
import { CreateGrowthOrderDto } from '../dto/create-growth-order.dto';
import { ItemsOrderDto } from '../dto/items-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { GrowthOrderEntity } from '../entities/growth-order.entity';
import { ItemsGrowthOrderEntity } from '../entities/items-growth-order.entity';

@Injectable()
export class GrowthOrderService {
 constructor(
  @InjectRepository(GrowthOrderEntity)
  private readonly growthOrderRepository: Repository<GrowthOrderEntity>,
  @InjectRepository(ItemsGrowthOrderEntity)
  private readonly itemsGrowthOrderRepository: Repository<ItemsGrowthOrderEntity>,
  private readonly productServices: ProductsService,
 ) {}

 async createGrowthOrder(growthOrderDto: CreateGrowthOrderDto, orderId: number): Promise<GrowthOrderEntity> {
  const growthOrder = new GrowthOrderEntity();
  growthOrder.orderId = orderId;
  growthOrder.itemsGrowthOrder = [];

  const itemsGrowthOrder: ItemsOrderDto[] = growthOrderDto.items;
  let totalGrowthOrderPrice = 0;

  for (const growthItem of itemsGrowthOrder) {
   const product: ProductEntity = await this.findProductById(growthItem.productId);

   const itemsGrowthOrder = new ItemsGrowthOrderEntity();
   itemsGrowthOrder.product = product;
   itemsGrowthOrder.order_quantity = growthItem.order_quantity;
   itemsGrowthOrder.plate = growthItem.plate;
   const productPrice = product.price;
   const growthTotalPrice = productPrice * itemsGrowthOrder.order_quantity;
   totalGrowthOrderPrice += growthTotalPrice;
   growthOrder.itemsGrowthOrder.push(itemsGrowthOrder);
  }
  growthOrder.totalPrice = totalGrowthOrderPrice;

  return await this.growthOrderRepository.save(growthOrder);
 }
 async findProductById(id: number) {
  const product = await this.productServices.findOne(id);
  if (!product) {
   throw new NotFoundException(`Product with ID ${id} not found.`);
  }
  return product;
 }

 async updateStatusGrowthOrder(updateStatusOrderDto: UpdateStatusOrderDto) {
  const { idOrder, idItemOrder, status } = updateStatusOrderDto;
  const itemsGrowthOrder = await this.growthOrderRepository.findOne({
   where: { id: idOrder },
   relations: ['itemsGrowthOrder'],
  });

  if (!itemsGrowthOrder) {
   throw new Error('Order not found');
  }
  const item = itemsGrowthOrder.itemsGrowthOrder.find(item => item.id === idItemOrder);

  if (!item) {
   throw new Error('Item in order not found');
  }

  item.status = status;

  return await this.itemsGrowthOrderRepository.save(item);
 }
}
