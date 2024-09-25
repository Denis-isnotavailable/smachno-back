import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingController } from './controllers/rating.controller';
import { RatingEntity } from './entities/rating.entity';
import { RatingService } from './services/rating.service';

@Module({
 imports: [TypeOrmModule.forFeature([RatingEntity])],
 controllers: [RatingController],
 providers: [RatingService],
 exports: [RatingService],
})
export class RatingModule {}
