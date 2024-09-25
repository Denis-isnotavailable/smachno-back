import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@src/entities/product.entity';
import { ProductsService } from '@src/services/products.service';
import { MonopayEntity } from 'src/monopay/entities/monopay.entity';
import { MonopayService } from 'src/monopay/services/monopay.service';
import { UsersModule } from '../users/users.module';
import { OrdersController } from './controllers/orders.controller';
import { GrowthOrderEntity } from './entities/growth-order.entity';
import { ItemsGrowthOrderEntity } from './entities/items-growth-order.entity';
import { ItemsSelfOrderEntity } from './entities/items-self-order.entity';
import { ItemsZsuOrderEntity } from './entities/items-zsu-order.entity';
import { OrderEntity } from './entities/order.entity';
import { SelfOrderEntity } from './entities/self-order.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ZsuOrderEntity } from './entities/zsu-order.entity';
import { GrowthOrderService } from './services/growthOrder.service';
import { OrdersService } from './services/orders.service';
import { SelfOrderService } from './services/selfOrder.service';
import { CreateShippingService } from './services/shipping.service';
import { ZsuOrderService } from './services/zsuOrder.service';

@Module({
 imports: [
  TypeOrmModule.forFeature([
   OrderEntity,
   GrowthOrderEntity,
   SelfOrderEntity,
   ZsuOrderEntity,
   ProductEntity,
   ShippingEntity,
   MonopayEntity,
   ItemsZsuOrderEntity,
   ItemsSelfOrderEntity,
   ItemsGrowthOrderEntity,
  ]),
  UsersModule,
 ],
 controllers: [OrdersController],
 providers: [
  OrdersService,
  CreateShippingService,
  SelfOrderService,
  ProductsService,
  ZsuOrderService,
  GrowthOrderService,
  MonopayService,
 ],
 exports: [OrdersService],
})
export class OrdersModule {}
