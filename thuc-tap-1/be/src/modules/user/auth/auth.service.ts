import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { formatMessage, MESSAGE_KEYS } from '@/share/messages';
import * as bcrypt from 'bcrypt';

import { UserRole } from '@/share/enum';
import { RegisterResDto } from './dto/registerRes.dto';
import { UsersService } from '@/modules/admin/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async userExists(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Đăng nhập
  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException(
        formatMessage(MESSAGE_KEYS.COMMON.UNAUTHORIZED),
      );
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    const result = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      access_token: result,
    };
  }

  // Đăng kí
  async register(registerDto: RegisterDto): Promise<RegisterResDto> {
    console.log(registerDto);
    if (await this.userExists(registerDto.email)) {
      throw new BadRequestException(
        formatMessage(MESSAGE_KEYS.USER.ALREADY_EXISTS, {
          email: registerDto.email,
        }),
      );
    }
    const passwordHash = await this.hashPassword(registerDto.password);

    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: passwordHash,
        role: UserRole.USER,
      },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return user as RegisterResDto;
  }
}
