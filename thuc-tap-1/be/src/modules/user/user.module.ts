import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule],
})
export class UserModule {}
