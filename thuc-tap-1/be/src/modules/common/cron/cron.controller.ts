import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CronService } from './cron.service';
import { Public } from '../decorator/metadata.decorator';

@ApiTags('Cron')
@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Get('test')
  @Public()
  @ApiOperation({ summary: 'Chạy cron cập nhật giá token thủ công' })
  @ApiOkResponse({ description: 'Cron cập nhật giá đã được kích hoạt' })
  updatePriceTokens() {
    return this.cronService.updatePriceTokens();
  }

  @Get('test2')
  @Public()
  @ApiOperation({ summary: 'Chạy cron kiểm tra cảnh báo thủ công' })
  @ApiOkResponse({ description: 'Cron cảnh báo giá đã được kích hoạt' })
  triggerAlert() {
    return this.cronService.triggerAlert();
  }
}
