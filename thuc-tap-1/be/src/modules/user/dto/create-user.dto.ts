import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '@/share/enum';

export class CreateUserDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Địa chỉ email duy nhất',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'username123',
    description: 'Tên hiển thị của người dùng',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Mật khẩu đăng nhập',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '123 Nguyễn Huệ, Q1, TP.HCM',
    description: 'Địa chỉ người dùng',
  })
  @IsString()
  address: string;

  @ApiProperty({ example: '0987654321', description: 'Số điện thoại liên hệ' })
  @IsString()
  phone: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Vai trò người dùng',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
