import { Module } from '@nestjs/common';
import { AxiosService } from './axios.service';
import { AxiosController } from './axios.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AxiosController],
  providers: [AxiosService],
  imports: [HttpModule],
  exports: [AxiosService],
})
export class AxiosModule {}
