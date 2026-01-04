import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheModule } from '@/modules/common/cache/cache.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [ CacheModule],
})
export class DashboardModule {}
