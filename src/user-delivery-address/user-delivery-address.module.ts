import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDeliveryAddressController } from './controllers/user-delivery-address.controller';
import { UserDeliveryAddressEntity } from './entities/user-delivery-address.entity';
import { UserDeliveryAddressService } from './services/user-delivery-address.service';

@Module({
 imports: [TypeOrmModule.forFeature([UserDeliveryAddressEntity])],
 controllers: [UserDeliveryAddressController],
 providers: [UserDeliveryAddressService],
 exports: [UserDeliveryAddressService],
})
export class UserDeliveryAddressModule {}
