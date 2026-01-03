import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { User } from '@/modules/common/decorator/user.decorator';

@ApiTags('Alerts')
@ApiBearerAuth()
@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo cảnh báo giá mới' })
  @ApiBody({ type: CreateAlertDto })
  @ApiOkResponse({ description: 'Cảnh báo đã được tạo' })
  create(@Body() createAlertDto: CreateAlertDto, @User() user: any) {
    return this.alertsService.create(createAlertDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy tất cả cảnh báo của người dùng' })
  @ApiOkResponse({ description: 'Danh sách cảnh báo' })
  findAll(@User() user: any) {
    return this.alertsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy chi tiết cảnh báo theo ID token' })
  @ApiParam({ name: 'id', description: 'ID token' })
  @ApiOkResponse({ description: 'Thông tin cảnh báo' })
  findAlertWithTokenId(@Param('id') id: string, @User() user: any) {
    return this.alertsService.findAlertWithTokenId(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật cảnh báo' })
  @ApiParam({ name: 'id', description: 'ID cảnh báo' })
  @ApiBody({ type: UpdateAlertDto })
  @ApiOkResponse({ description: 'Cảnh báo đã được cập nhật' })
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto, @User() user: any) {
    return this.alertsService.update(id, updateAlertDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa cảnh báo' })
  @ApiParam({ name: 'id', description: 'ID cảnh báo' })
  @ApiOkResponse({ description: 'Cảnh báo đã được xóa' })
  remove(@Param('id') id: string , @User() user: any) {
    return this.alertsService.remove(id, user);
  }
}
