import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonopayEntity } from '../entities/monopay.entity';

@Injectable()
export class MonopayService {
 constructor(
  @InjectRepository(MonopayEntity)
  private readonly monopayRepository: Repository<MonopayEntity>,
 ) {}

 async save(PayData: MonopayEntity) {
  return await this.monopayRepository.save(PayData);
 }

 async get(invoiceId: string) {
  const payData = await this.monopayRepository.findOne({
   where: { invoiceId },
  });

  return payData;
 }

 async update(invoiceId: string, updateMonoDto: MonopayEntity) {
  const payData = await this.monopayRepository.findOne({
   where: { invoiceId },
  });
  for (const key in updateMonoDto) {
   if (updateMonoDto.hasOwnProperty(key)) {
    payData[key] = updateMonoDto[key];
   }
  }
  return await this.monopayRepository.update({ invoiceId }, payData);
 }
}
