import { typeOrmConfig } from '@config/DB.config';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '@src/products.module';
import { MailerModule } from '@utils/mailer/mailer.module';
import { CompressionMiddleware } from '@utils/middleware/compression.middleware';
import * as cloudinary from 'cloudinary';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AuthModule } from './auth/auth.module';
import { MonopayModule } from './monopay/monopay.module';
import { OrdersModule } from './orders/orders.module';
import { RatingModule } from './rating/rating.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserDeliveryAddressModule } from './user-delivery-address/user-delivery-address.module';
import { UsersModule } from './users/users.module';

@Module({
 imports: [
  UsersModule,
  ProductsModule,
  OrdersModule,
  ReviewsModule,
  UserDeliveryAddressModule,
  NestjsFormDataModule,
  MonopayModule,
  TypeOrmModule.forRoot(typeOrmConfig),
  ConfigModule.forRoot({
   isGlobal: true,
  }),
  MailerModule,
  ThrottlerModule.forRoot([
   {
    ttl: 60,
    limit: 10,
   },
  ]),
  AuthModule,
  RatingModule,
 ],
 providers: [ConfigModule],
})
export class AppModule implements NestModule {
 configure(consumer: MiddlewareConsumer) {
  consumer.apply(CompressionMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
 }

 constructor(private configService: ConfigService) {
  /*const cloudName = this.configService.get<string>('CLOUDINARY_CLOUD_NAME');
		  const apiKey = this.configService.get<string>('CLOUDINARY_API_KEY');
		  const apiSecret = this.configService.get<string>('CLOUDINARY_API_SECRET');*/
  cloudinary.v2.config({
   cloud_name: 'dri4ndedq',
   api_key: '537369333499899',
   api_secret: '3xb-_rUWwHCxWAIWi0nf2C6KCcA',
   secure: true,
  });
 }
}
