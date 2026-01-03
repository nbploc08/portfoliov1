import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@/share/enum';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Email người dùng' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'StrongPass123',
    description: 'Mật khẩu từ 8-32 ký tự',
    minLength: 8,
    maxLength: 32,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN, description: 'Vai trò cho tài khoản' })
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
