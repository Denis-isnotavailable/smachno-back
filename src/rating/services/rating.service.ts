import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as geoip from 'geoip-lite';
import { Repository } from 'typeorm';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { RatingEntity } from '../entities/rating.entity';
@Injectable()
export class RatingService {
 constructor(
  @InjectRepository(RatingEntity)
  private readonly ratingRepository: Repository<RatingEntity>,
 ) {}

 async getGeoLocation(ip: string): Promise<{ country: string; city: string }> {
  const geo = geoip.lookup(ip);
  if (geo) {
   const country = geo.country;
   const city = geo.city || 'Unknown';
   return { country, city };
  }
  return { country: 'Unknown', city: 'Unknown' };
 }
 async createOrUpdate(createRatingDto: CreateRatingDto, clientIp: string) {
  const { country, city } = await this.getGeoLocation(clientIp);

  let rating = await this.ratingRepository.findOne({ where: { clientIp } });
  if (rating) {
   rating.rating = createRatingDto.rating;
   rating.country = country;
   rating.city = city;
   return await this.ratingRepository.save(rating);
  } else {
   rating = this.ratingRepository.create({ ...createRatingDto, clientIp, country, city });
  }

  return await this.ratingRepository.save(rating);
 }

 async findAll() {
  return await this.ratingRepository.find();
 }

 async getAverageRating() {
  const { avg } = await this.ratingRepository
   .createQueryBuilder('rating')
   .select('AVG(rating.rating)', 'avg')
   .getRawOne();

  return parseFloat(avg);
 }
}
