import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@/share/enum';
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'updated@example.com', description: 'Email mới' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'NewPass123', description: 'Mật khẩu mới' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.USER, description: 'Vai trò mới' })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
