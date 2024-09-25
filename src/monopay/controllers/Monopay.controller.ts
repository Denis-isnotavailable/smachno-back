import { Controller, Get, Post, Body, Param, UseGuards, Res, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { MonopayEntity } from '../entities/monopay.entity';
import { MonopayService } from '../services/monopay.service';

const basePaymentData = {
 invoiceId: '',
 status: '',
 failureReason: '',
 errCode: '',
 modifiedDate: '',
 reference: '',
};

@ApiTags('Monopay')
@Controller('monopay')
export class MonopayController {
 constructor(private readonly monopayService: MonopayService) {}

 @Post()
 @HttpCode(200)
 @ApiOperation({ summary: 'Webhook для отримання статусу рахунку' })
 async handleWebhook(@Body() data: MonopayEntity) {
  const entity = await this.monopayService.get(data.invoiceId);

  const entityModificationTime = new Date(entity?.modifiedDate).getTime() || 0;
  const dataModificationTime = new Date(data?.modifiedDate).getTime() || 0;

  const newData = dataModificationTime >= entityModificationTime ? { ...data } : { ...entity };

  const filteredUpdateData = { ...basePaymentData };
  for (const key in basePaymentData) {
   if (newData.hasOwnProperty(key)) {
    filteredUpdateData[key] = newData[key];
   }
  }

  if (entity) {
   await this.monopayService.update(filteredUpdateData.invoiceId, filteredUpdateData);
  } else {
   await this.monopayService.save(filteredUpdateData);
  }
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @Get(':id')
 @ApiOperation({ summary: 'Отримати дані платежу по invoiceId' })
 async findOne(@Param('id') id: string) {
  return this.monopayService.get(id);
 }
}
