import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerConfig } from '@utils/middleware/multer';
import { ProductsController } from './controllers/products.controller';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './services/products.service';

@Module({
 imports: [TypeOrmModule.forFeature([ProductEntity]), MulterModule.register(multerConfig)],
 controllers: [ProductsController],
 providers: [ProductsService],
 exports: [ProductsService],
})
export class ProductsModule {}
