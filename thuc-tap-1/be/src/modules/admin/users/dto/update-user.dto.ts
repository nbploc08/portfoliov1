
import { UserRole } from '@/share/enum';
import { IsEmail, IsOptional, IsString, IsEnum } from 'class-validator';

export class UpdateUserDto  {
    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;

}
