import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { Public } from '../decorator/metadata.decorator';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Get('test')
  @Public()
  updatePriceTokens() {
    return this.cronService.updatePriceTokens();
  }

  @Get('test2')
  @Public()
  triggerAlert() {
    return this.cronService.triggerAlert();
  }
}
