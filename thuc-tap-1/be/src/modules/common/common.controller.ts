import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommonService } from '@/modules/common/common.service';

@ApiTags('Common')
@ApiBearerAuth()
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('share')
  @ApiOperation({ summary: 'Get shared content' })
  @ApiResponse({ status: 200, description: 'Shared content for all users' })
  getShare(): string {
    return this.commonService.getShare();
  }
}
