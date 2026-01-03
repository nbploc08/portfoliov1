import { Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [totalUsers, totalPortfolios, totalAlerts, totalAssets] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.portfolio.count(),
        this.prisma.alert.count(),
        this.prisma.portfolioAsset.count(),
      ]);
    return {
      totalUsers,
      totalPortfolios,
      totalAlerts,
      totalAssets,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
