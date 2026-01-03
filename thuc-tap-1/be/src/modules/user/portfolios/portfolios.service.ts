import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import { formatMessage, MESSAGE_KEYS } from '@/share/messages';

@Injectable()
export class PortfoliosService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPortfolioDto: CreatePortfolioDto, user: any) {
    const portfolio = await this.prisma.portfolio.create({
      data: {
        name: createPortfolioDto.name,
        userId: user.id,
      },
    });

    return portfolio;
  }

  findAll(user: any) {
    if (user.role == Role.ADMIN) {
      return this.prisma.portfolio.findMany({
        where: {
          userId: user.id,
        },
      });
    } else if (user.role == Role.USER) {
      return this.prisma.portfolio.findMany({
        where: {
          userId: user.id,
        },
      });
    } else {
      throw new ForbiddenException(
        formatMessage(MESSAGE_KEYS.COMMON.FORBIDDEN),
      );
    }
  }

  findPortfolio(id: string, user: any) {
    if (user.role == Role.ADMIN) {
      return this.prisma.portfolio.findUnique({
        where: {
          id: id,
        },
      });
    } else if (user.role == Role.USER) {
      return this.prisma.portfolio.findUnique({
        where: {
          id: id,
          userId: user.id,
        },
      });
    } else {
      throw new ForbiddenException(
        formatMessage(MESSAGE_KEYS.COMMON.FORBIDDEN),
      );
    }
  }
  async update(id: string, updatePortfolioDto: UpdatePortfolioDto, user: any) {
    const portfolio = await this.findPortfolio(id, user);
    if (!portfolio) {
      throw new BadRequestException('portfolio_not_found');
    }
    return this.prisma.portfolio.update({
      where: { id: id },
      data: updatePortfolioDto,
    });
  }
  async remove(id: string, user: any) {
    const portfolio = await this.findPortfolio(id, user);
    if (!portfolio) {
      throw new BadRequestException('portfolio_not_found');
    }
    return this.prisma.portfolio.delete({
      where: { id: id, userId: user.id },
    });
  }
}
