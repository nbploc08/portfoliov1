import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { UserRole } from '@/share/enum';
import { Roles } from '@/modules/common/decorator/roles.decorator';

@ApiTags('Dashboard')
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Xem thống kê tổng hợp cho admin' })
  @ApiOkResponse({ description: 'Thống kê hệ thống cho admin' })
  getStats() {
    return this.dashboardService.getStats();
  }
}
