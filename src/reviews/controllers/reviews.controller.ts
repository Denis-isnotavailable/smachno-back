import {
 Controller,
 Get,
 Post,
 Body,
 Patch,
 Param,
 Delete,
 UseInterceptors,
 UploadedFile,
 HttpCode,
 HttpStatus,
 Query,
 UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { PageOptionsDto } from '@utils/pagination/dto/page-options.dto';
import { PageDto } from '@utils/pagination/dto/page.dto';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ReviewDto } from '../dto/review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { ReviewsService } from '../services/reviews.service';

@ApiTags('ВІДГУКИ')
@Controller('reviews')
export class ReviewsController {
 constructor(private readonly reviewsService: ReviewsService) {}

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Post()
 @ApiOperation({ summary: 'Створити відгук' })
 @UseInterceptors(FileInterceptor('reviewImage'))
 async createReview(@UploadedFile() reviewImage: Express.Multer.File, @Body() createReviewDto: CreateReviewDto) {
  return await this.reviewsService.createReview(createReviewDto, reviewImage);
 }

 @Get()
 @HttpCode(HttpStatus.OK)
 @ApiOperation({ summary: 'Отримати всі відгуки' })
 async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<ReviewDto>> {
  return this.reviewsService.findAll(pageOptionsDto);
 }

 @Get(':id')
 @ApiOperation({ summary: 'Отримати відгук по id' })
 async findOne(@Param('id') id: string) {
  return this.reviewsService.findOne(+id);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Patch(':id')
 @ApiOperation({ summary: 'Оновити відгук по id' })
 async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
  return this.reviewsService.update(+id, updateReviewDto);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Delete(':id')
 @ApiOperation({ summary: 'Видалити відгук по id' })
 async remove(@Param('id') id: string) {
  console.log('id', id);
  return this.reviewsService.delete(+id);
 }
}
