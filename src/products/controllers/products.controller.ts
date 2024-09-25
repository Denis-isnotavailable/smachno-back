import {
 Controller,
 Get,
 Post,
 Body,
 Patch,
 Param,
 Delete,
 UseInterceptors,
 UploadedFiles,
 UseGuards,
 UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('Продукти')
@Controller('products')
export class ProductsController {
 constructor(private readonly productsService: ProductsService) {}

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @UsePipes()
 @Post()
 @ApiOperation({ summary: 'Створити продукт' })
 @UseInterceptors(
  FileFieldsInterceptor([
   { name: 'productImage', maxCount: 1 },
   { name: 'productIcon', maxCount: 1 },
  ]),
 )
 async createProduct(
  @Body() createProductDto: CreateProductDto,
  @UploadedFiles() files: { productImage: Express.Multer.File[]; productIcon: Express.Multer.File[] },
 ) {
  return await this.productsService.createProduct(createProductDto, files.productImage[0], files.productIcon[0]);
 }

 @Get()
 @ApiOperation({ summary: 'Отримати всі продукти' })
 async findAll() {
  return this.productsService.findAll();
 }

 @Get(':id')
 @ApiOperation({ summary: 'Отримати продукт за id' })
 async findOne(@Param('id') id: string) {
  return this.productsService.findOne(+id);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Patch(':id')
 @ApiOperation({ summary: 'Оновити продукт за id' })
 @UseInterceptors(
  FileFieldsInterceptor([
   { name: 'productImage', maxCount: 1 },
   { name: 'productIcon', maxCount: 1 },
  ]),
 )
 async update(
  @Param('id') id: string,
  @Body() updateProductDto: UpdateProductDto,
  @UploadedFiles() files?: { productImage?: Express.Multer.File[]; productIcon?: Express.Multer.File[] },
 ) {
  const productImage = files?.productImage?.[0];
  const productIcon = files?.productIcon?.[0];

  return this.productsService.update(+id, updateProductDto, productImage, productIcon);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Delete(':id')
 @ApiOperation({ summary: 'Видалити продукт за id' })
 async remove(@Param('id') id: string) {
  return this.productsService.softDelete(+id);
 }
}
