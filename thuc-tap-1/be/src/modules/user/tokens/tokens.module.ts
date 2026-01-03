import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { AxiosModule } from '@/modules/common/axios/axios.module';

@Module({
  controllers: [TokensController],
  providers: [TokensService],
  imports: [AxiosModule],
  exports: [TokensService],
})
export class TokensModule {}
