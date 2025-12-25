import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CreateUserDTO } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDTO } from '@/modules/user/dto/update-user.dto';
import { UserRole } from '@/share/enum';
import { User } from '@/entities/user.entity';
import { MESSAGE_KEYS } from '@/share/messages';

@Injectable()
export class UserService {}
