import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '@utils/pagination/dto/page-meta.dto';
import { PageOptionsDto } from '@utils/pagination/dto/page-options.dto';
import { PageDto } from '@utils/pagination/dto/page.dto';
import * as cloudinary from 'cloudinary';
import { Multer } from 'multer';
import { Repository } from 'typeorm';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewDto } from '../dto/review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewEntity } from '../entities/review.entity';

@Injectable()
export class ReviewsService {
 constructor(
  @InjectRepository(ReviewEntity)
  private readonly reviewRepository: Repository<ReviewEntity>,
 ) {}
 async createReview(CreateReviewDto: CreateReviewDto, reviewImage: Express.Multer.File) {
  try {
   const { secure_url, public_id } = await this.uploadReviewImage(reviewImage);
   const newReview = this.createReviewEntity(CreateReviewDto, secure_url, public_id);

   return await this.saveReview(newReview);
  } catch (error) {
   return error;
  }
 }

 private async uploadReviewImage(imageFile: Express.Multer.File) {
  try {
   const uploadedImage = await cloudinary.v2.uploader.upload(imageFile.path, {
    folder: 'reviews_images',
    use_filename: true,
    unique_filename: true,
   });
   return uploadedImage;
  } catch (error) {
   throw new Error('Error uploading image');
  }
 }

 private createReviewEntity(CreateReviewDto: CreateReviewDto, reviewImageUrl: string, reviewImagePublicId: string) {
  const newReview = new ReviewEntity();
  newReview.reviewUrl = CreateReviewDto.reviewUrl;
  newReview.text = CreateReviewDto.text;
  newReview.reviewImage = reviewImageUrl;
  newReview.reviewImagePublicId = reviewImagePublicId;

  return newReview;
 }

 async saveReview(Reviews: ReviewEntity) {
  return await this.reviewRepository.save(Reviews);
 }

 async findOne(id: number) {
  const review = await this.reviewRepository.findOne({
   where: { id },
  });
  if (!review) {
   throw new NotFoundException(`Review with ID ${id} not found`);
  }
  return review;
 }

 async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ReviewDto>> {
  const queryBuilder = this.reviewRepository.createQueryBuilder('review');

  queryBuilder.orderBy('review.createdAt', pageOptionsDto.order).skip(pageOptionsDto.skip).take(pageOptionsDto.take);

  const itemCount = await queryBuilder.getCount();
  const { entities } = await queryBuilder.getRawAndEntities();

  const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

  return new PageDto(entities, pageMetaDto);
 }

 async update(id: number, updateReviewDto: UpdateReviewDto) {
  const review = await this.findOne(id);
  for (const key in updateReviewDto) {
   if (updateReviewDto[key]) {
    review[key] = updateReviewDto[key];
   }
  }
  return await this.reviewRepository.save(review);
 }

 async delete(id: number) {
  const review = await this.findOne(id);
  if (review.reviewImagePublicId) {
   await cloudinary.v2.uploader.destroy(review.reviewImagePublicId);
  }
  const deletedReview = await this.reviewRepository.remove(review);
  return {
   message: 'Review deleted successfully',
   review: deletedReview,
  };
 }
}
