import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '@/share/enum';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    example: 'new@example.com',
    description: 'Email mới của người dùng',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: 'new-username',
    description: 'Tên hiển thị mới',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiPropertyOptional({
    example: 'newPassword123',
    description: 'Mật khẩu mới',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: '456 Hai Bà Trưng, Q3, TP.HCM',
    description: 'Địa chỉ mới',
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({
    example: '0912345678',
    description: 'Số điện thoại mới',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    enum: UserRole,
    example: UserRole.ADMIN,
    description: 'Vai trò mới',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
