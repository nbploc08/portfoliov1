import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { formatMessage, MESSAGE_KEYS } from '@/share/messages';
import * as bcrypt from 'bcrypt';

import { UserRole } from '@/share/enum';
import { RegisterResDto } from './dto/registerRes.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async userExists(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
  // constructor(private usersService: UsersService) {}

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user?.password !== pass) {
  //     throw new UnauthorizedException();
  //   }
  //   const { password, ...result } = user;
  //   // TODO: Generate a JWT and return it here
  //   // instead of the user object
  //   return result;
  // }
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
