import { Module } from '@nestjs/common';
import { CommonController } from '@/modules/common/common.controller';
import { CommonService } from '@/modules/common/common.service';
import { CronModule } from './cron/cron.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AxiosModule } from './axios/axios.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [CronModule, ScheduleModule.forRoot(), AxiosModule],
})
export class CommonModule {}
