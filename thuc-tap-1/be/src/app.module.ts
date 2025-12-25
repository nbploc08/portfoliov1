import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user/user.module';
import { AdminModule } from '@/modules/admin/admin.module';
import { CommonModule } from '@/modules/common/common.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { AuthGuard } from './modules/common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './modules/common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule,
    AdminModule,
    CommonModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
