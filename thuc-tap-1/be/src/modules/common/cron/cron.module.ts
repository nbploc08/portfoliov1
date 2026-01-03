import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { AxiosModule } from '../axios/axios.module';

@Module({
  controllers: [CronController],
  providers: [CronService],
  imports: [AxiosModule],
  exports: [CronService],
})
export class CronModule {}
