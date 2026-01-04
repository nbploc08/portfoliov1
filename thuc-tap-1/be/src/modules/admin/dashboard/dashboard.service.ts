import { Inject, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ICacheService } from '@/modules/common/cache/cache.interface';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService,@Inject('ICacheService') private readonly cacheService: ICacheService) {}

  async getStats() {


    const cached = await this.cacheService.get('admin:stats');
    if (cached) {
      console.log('cached', cached);
      return cached;
    }



    const [totalUsers, totalPortfolios, totalAlerts, totalAssets] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.portfolio.count(),
        this.prisma.alert.count(),
        this.prisma.portfolioAsset.count(),
      ]);

      const stats = {
      totalUsers,
      totalPortfolios,
      totalAlerts,
      totalAssets,
    };

    await this.cacheService.set('admin:stats', stats, 50000);
      console.log('stats not cached', stats);
    return stats 
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

