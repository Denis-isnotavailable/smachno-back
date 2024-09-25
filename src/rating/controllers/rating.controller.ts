import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { CreateRatingDto } from '../dto/create-rating.dto';
import { RatingService } from '../services/rating.service';

@ApiTags('Рейтинг')
@Controller('rating')
export class RatingController {
 constructor(private readonly ratingService: RatingService) {}

 @Post()
 @ApiOperation({ summary: 'Відправити рейтинг' })
 async createOrUpdate(@Body() createRatingDto: CreateRatingDto, @Req() req) {
  const clientIp = (req.headers['x-forwarded-for'] || req.ip).split(',')[0];
  return this.ratingService.createOrUpdate(createRatingDto, clientIp);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Get()
 @ApiOperation({ summary: 'Отримати всі  оцінки рейтингу (ADMIN ONLY)' })
 findAll() {
  return this.ratingService.findAll();
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Get('avg')
 @ApiOperation({ summary: 'Отримати середній рейтинг (ADMIN ONLY)' })
 getAverageRating() {
  return this.ratingService.getAverageRating();
 }
}
