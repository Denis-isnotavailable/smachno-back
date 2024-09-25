import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as cloudinary from 'cloudinary';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductsService {
 constructor(
  @InjectRepository(ProductEntity)
  private readonly productRepository: Repository<ProductEntity>,
 ) {}

 async createProduct(
  createProductDto: CreateProductDto,
  productImage: Express.Multer.File,
  productIcon: Express.Multer.File,
 ) {
  try {
   const imageUploadResult = await this.uploadProductImage(productImage);
   const iconUploadResult = await this.uploadProductIcons(productIcon);

   const newProduct = this.createProductEntity(
    createProductDto,
    imageUploadResult.secure_url,
    imageUploadResult.public_id,
    iconUploadResult.secure_url,
    iconUploadResult.public_id,
   );
   return await this.saveProduct(newProduct);
  } catch (error) {
   return error;
  }
 }

 private async uploadProductImage(imageFile: Express.Multer.File) {
  try {
   const uploadedImage = await cloudinary.v2.uploader.upload(imageFile.path, {
    folder: 'products_images',
    use_filename: true,
    unique_filename: true,
   });

   return uploadedImage;
  } catch (error) {
   return error;
  }
 }

 private async uploadProductIcons(imageFile: Express.Multer.File) {
  try {
   const uploadedIcon = await cloudinary.v2.uploader.upload(imageFile.path, {
    folder: 'products_icons',
    use_filename: true,
    unique_filename: true,
   });

   return uploadedIcon;
  } catch (error) {
   console.error('Error uploading icon to Cloudinary', error);
   return error;
  }
 }

 private createProductEntity(
  createProductDto: CreateProductDto,
  productImage: string,
  imagePublicId: string,
  productIcon: string,
  iconPublicId: string,
 ) {
  const newProduct = new ProductEntity();
  newProduct.name = createProductDto.name;
  newProduct.description = createProductDto.description;
  newProduct.productImage = productImage;
  newProduct.imagePublicId = imagePublicId;
  newProduct.productIcon = productIcon;
  newProduct.iconPublicId = iconPublicId;
  newProduct.price = createProductDto.price;
  newProduct.packaging = createProductDto.packaging;
  newProduct.seasonStart = createProductDto.seasonStart;
  newProduct.seasonEnd = createProductDto.seasonEnd;
  newProduct.weightMin = createProductDto.weightMin;
  newProduct.weightMax = createProductDto.weightMax;
  newProduct.unit = createProductDto.unit;
  newProduct.dimensionsHeight = createProductDto.dimensionsHeight;
  newProduct.dimensionsWidth = createProductDto.dimensionsWidth;
  newProduct.dimensionsLength = createProductDto.dimensionsLength;
  newProduct.isReadyToOrderForGrowth = createProductDto.isReadyToOrderForGrowth;
  newProduct.isNowInSell = createProductDto.isNowInSell;
  newProduct.shipping = createProductDto.shipping;
  return newProduct;
 }

 async saveProduct(product: ProductEntity) {
  try {
   return await this.productRepository.save(product);
  } catch (error) {
   return error;
  }
 }

 async findAll() {
  return await this.productRepository.find();
 }

 async findOne(id: number) {
  const product = await this.productRepository.findOne({
   where: { id },
  });
  if (!product) {
   throw new Error(`Product with ID ${id} not found`);
  }

  return product;
 }

 async update(
  id: number,
  updateProductDto: UpdateProductDto,
  productImage?: Express.Multer.File,
  productIcon?: Express.Multer.File,
 ) {
  const product = await this.findOne(id);
  if (productImage) {
   const imageUploadResult = await this.uploadProductImage(productImage);
   product.productImage = imageUploadResult.secure_url;
   product.imagePublicId = imageUploadResult.public_id;
  }

  if (productIcon) {
   const iconUploadResult = await this.uploadProductIcons(productIcon);
   product.productIcon = iconUploadResult.secure_url;
   product.iconPublicId = iconUploadResult.public_id;
  }

  for (const key in updateProductDto) {
   if (updateProductDto.hasOwnProperty(key) && updateProductDto[key] !== undefined) {
    product[key] = updateProductDto[key];
   }
  }

  return await this.productRepository.save(product);
 }

 async softDelete(id: number) {
  const product = await this.findOne(id);

  if (!product) {
   throw new Error(`Product with ID ${id} not found`);
  }
  if (product.isDeleted) {
   throw new Error(`Product with ID ${id} already deleted`);
  }

  product.isDeleted = true;
  product.deletedAt = new Date();
  product.isNowInSell = false;

  await this.productRepository.save(product);

  return {
   message: `Product with id ${id} deleted successfully`,
   product,
  };
 }
}
