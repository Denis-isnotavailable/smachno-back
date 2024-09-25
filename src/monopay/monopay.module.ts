import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonopayController } from './controllers/Monopay.controller';
import { MonopayEntity } from './entities/monopay.entity';
import { MonopayService } from './services/monopay.service';

@Module({
 imports: [TypeOrmModule.forFeature([MonopayEntity])],
 controllers: [MonopayController],
 providers: [MonopayService],
 exports: [MonopayService],
})
export class MonopayModule {}
