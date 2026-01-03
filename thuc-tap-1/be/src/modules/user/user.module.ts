import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { AuthModule } from './auth/auth.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { AssetModule } from './asset/asset.module';
import { TokensModule } from './tokens/tokens.module';
import { PriceModule } from './price/price.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, PortfoliosModule, AssetModule, TokensModule, PriceModule, AlertsModule],
})
export class UserModule {}
