import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@/share/enum';
import { IsEmail, IsString, IsNotEmpty, IsEnum } from 'class-validator';

export class RegisterResDto {
  @ApiProperty({
    example: 'a1b2c3',
    description: 'ID của người dùng vừa đăng ký',
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'user@example.com', description: 'Email người dùng' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Vai trò đã gán',
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
