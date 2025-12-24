import { Module } from '@nestjs/common';
import { AdminController } from '@/modules/admin/admin.controller';
import { AdminService } from '@/modules/admin/admin.service';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [UsersModule],
})
export class AdminModule {}
