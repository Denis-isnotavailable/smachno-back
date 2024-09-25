import {
 Controller,
 Get,
 Post,
 Body,
 Param,
 Delete,
 UseGuards,
 Req,
 Patch,
 HttpStatus,
 HttpException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HasRoles } from '@utils/decorators/has-roles.decorator';
import { Role } from '@utils/enums/role.enum';
import { JwtAuthGuard } from '@utils/guards/jwt-auth.guard';
import { RolesGuard } from '@utils/guards/roles.guard';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateStatusOrderDto } from '../dto/update-status-order.dto';
import { GrowthOrderService } from '../services/growthOrder.service';
import { OrdersService } from '../services/orders.service';
import { SelfOrderService } from '../services/selfOrder.service';
import { ZsuOrderService } from '../services/zsuOrder.service';

@ApiTags('Замовлення')
@Controller('orders')
export class OrdersController {
 constructor(
  private readonly ordersService: OrdersService,
  private readonly zsuOrderService: ZsuOrderService,
  private readonly selfOrderService: SelfOrderService,
  private readonly growthOrderService: GrowthOrderService,
 ) {}

 @Post()
 @UseGuards(JwtAuthGuard)
 @ApiOperation({ summary: 'Створення замовлення' })
 create(@Body() createOrderDto: CreateOrderDto, @Req() req) {
  return this.ordersService.create(createOrderDto, req.user);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення (ADMIN ONLY)' })
 @Get('all')
 async findAllOrders() {
  return this.ordersService.findAllOrders();
 }

 @Get('self')
 @ApiOperation({ summary: 'Отримати всі замовлення самовивозу (USER)' })
 @UseGuards(JwtAuthGuard)
 async findAllSelfOrdersByUser(@Req() req) {
  return this.ordersService.findAllSelfOrdersByUser(req.user);
 }

 //@HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення самовивозу (ADMIN ONLY)' })
 @Get('self/all')
 async findAllSelfOrders() {
  return this.ordersService.findAllSelfOrders();
 }

 @Get('zsu')
 @UseGuards(JwtAuthGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення ЗСУ (USER)' })
 async findAllZsuOrdersByUser(@Req() req) {
  return this.ordersService.findAllZsuOrdersByUser(req.user);
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення ЗСУ (ADMIN ONLY)' })
 @Get('zsu/all')
 async findAllZsuOrders() {
  return this.ordersService.findAllZsuOrders();
 }

 @HasRoles(Role.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення на виріст (ADMIN ONLY)' })
 @Get('growth/all')
 async findAllGrowthOrders() {
  return this.ordersService.findAllGrowthOrders();
 }

 @Get('growth')
 @UseGuards(JwtAuthGuard)
 @ApiOperation({ summary: 'Отримати всі замовлення на виріст (USER)' })
 async findAllGrowthOrdersByUser(@Req() req) {
  return this.ordersService.findAllGrowthOrdersByUser(req.user);
 }

 @UseGuards(JwtAuthGuard, RolesGuard)
 @ApiOperation({ summary: 'Отримати замовлення по id користувача (ADMIN ONLY)' })
 @Get(':id')
 async findOne(@Param('id') id: number, @Req() req) {
  return this.ordersService.findOne(id, req.user);
 }

 @Delete(':id')
 remove(@Param('id') id: number) {
  return this.ordersService.remove(id);
 }

 @HasRoles(Role.ADMIN)
 @Patch('update-status')
 @ApiOperation({ summary: 'Змінити статус замовлення (ADMIN ONLY)' })
 @UseGuards(JwtAuthGuard, RolesGuard)
 async updateStatusOrder(@Body() updateStatusOrderDto: UpdateStatusOrderDto) {
  switch (updateStatusOrderDto.typeOrder) {
   case 'zsuOrder':
    try {
     const updatedItem = await this.zsuOrderService.updateStatusZsuOrder(updateStatusOrderDto);
     return {
      data: updatedItem,
     };
    } catch (e) {
     throw new HttpException(
      {
       message: e.message,
      },
      HttpStatus.BAD_REQUEST,
     );
    }
   case 'selfOrder':
    try {
     const updatedItem = await this.selfOrderService.updateStatusSelfOrder(updateStatusOrderDto);
     return {
      data: updatedItem,
     };
    } catch (e) {
     throw new HttpException(
      {
       message: e.message,
      },
      HttpStatus.BAD_REQUEST,
     );
    }
   case 'growthOrder':
    try {
     const updatedItem = await this.growthOrderService.updateStatusGrowthOrder(updateStatusOrderDto);
     return {
      data: updatedItem,
     };
    } catch (e) {
     throw new HttpException(
      {
       message: e.message,
      },
      HttpStatus.BAD_REQUEST,
     );
    }
   default:
    return { message: 'Тип замовлення невірний' };
  }
  // return this.ordersService.create(createOrderDto, req.user);
 }

 @Post('liqpay')
 async liqpay(@Body() body: any) {
  return this.ordersService.getStatusLiqPay(body);
 }
}
