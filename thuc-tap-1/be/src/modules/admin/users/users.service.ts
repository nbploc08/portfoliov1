import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { formatMessage, MESSAGE_KEYS } from '@/share/messages';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const passwordHash = await bcrypt.hash(password, 10);
    if (await this.findOneByEmail(email)) {
      throw new BadRequestException(
        formatMessage(MESSAGE_KEYS.USER.ALREADY_EXISTS, {
          email: email,
        }),
      );
    }
    const user = await this.prisma.user.create({
      data: { email, password: passwordHash, role },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return user;
  }

  findAll() {
    return this.prisma.user.findMany();
  }
  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { email, password, role } = updateUserDto;
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const user = await this.prisma.user.update({
      where: { id },
      data: { email, password: passwordHash, role },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    return user;
  }
  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
