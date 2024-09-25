import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerConfig } from '@utils/middleware/multer';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewEntity } from './entities/review.entity';
import { ReviewsService } from './services/reviews.service';

@Module({
 imports: [TypeOrmModule.forFeature([ReviewEntity]), MulterModule.register(multerConfig)],
 controllers: [ReviewsController],
 providers: [ReviewsService],
 exports: [ReviewsService],
})
export class ReviewsModule {}
