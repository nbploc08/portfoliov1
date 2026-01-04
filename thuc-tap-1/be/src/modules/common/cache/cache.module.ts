// cache.module.ts
import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { CacheManagerService } from './cache-manager.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'ICacheService',
      useClass: CacheManagerService,
    },
  ],
  exports: ['ICacheService'],
})
export class CacheModule {}
