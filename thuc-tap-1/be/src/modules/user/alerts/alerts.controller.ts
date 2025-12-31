import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { User } from '@/modules/common/decorator/user.decorator';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}

  @Post()
  create(@Body() createAlertDto: CreateAlertDto, @User() user: any) {
    return this.alertsService.create(createAlertDto, user);
  }

  @Get()
  findAll(@User() user: any) {
    return this.alertsService.findAll(user);
  }

  @Get(':id')
  findAlertWithTokenId(@Param('id') id: string, @User() user: any) {
    return this.alertsService.findAlertWithTokenId(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto, @User() user: any) {
    return this.alertsService.update(id, updateAlertDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string , @User() user: any) {
    return this.alertsService.remove(id, user);
  }
}
