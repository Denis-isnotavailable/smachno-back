import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interface/page-meta-dto-parameters.interface';

export class PageMetaDto {
 @ApiProperty()
 readonly page: number;

 @ApiProperty()
 readonly take: number;

 @ApiProperty()
 readonly itemCount: number;

 @ApiProperty()
 readonly pageCount: number;

 @ApiProperty()
 readonly hasNextPage: boolean;

 @ApiProperty()
 readonly hasPreviousPage: boolean;

 constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
  this.page = pageOptionsDto.page;
  this.take = pageOptionsDto.take;
  this.itemCount = itemCount;
  this.pageCount = Math.ceil(itemCount / pageOptionsDto.take);
  this.hasNextPage = this.page < this.pageCount;
  this.hasPreviousPage = this.page > 1;
 }
}
