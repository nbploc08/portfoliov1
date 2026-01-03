import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AlertCondition } from '@prisma/client';

@Injectable()
export class AlertsService {
  constructor(private readonly prisma: PrismaService) {}

  async alertExists(
    tokenId: string,
    condition: AlertCondition,
    targetPrice: number,
    userId: string,
  ) {
    return this.prisma.alert.findFirst({
      where: {
        tokenId,
        condition,
        targetPrice,
        userId,
      },
    });
  }

  async create(createAlertDto: CreateAlertDto, user: any) {
    const { tokenId, condition, targetPrice } = createAlertDto;
    const alertExists = await this.alertExists(
      tokenId,
      condition,
      targetPrice,
      user.id,
    );
    if (alertExists) {
      throw new BadRequestException('Alert already exists');
    }
    const alert = await this.prisma.alert.create({
      data: {
        tokenId,
        condition,
        targetPrice,
        userId: user.id,
      },
    });
    return alert;
  }

  async findAlertWithTokenId(id: string, user: any) {
    const alerts = await this.prisma.alert.findMany({
      where: {
        tokenId: id,
        userId: user.id,
      },
    });
    return alerts;
  }

  findAll(user: any) {
    return this.prisma.alert.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} alert`;
  }

  async update(id: string, updateAlertDto: UpdateAlertDto, user: any) {
    return this.prisma.alert.update({
      where: {
        id,
        userId: user.id,
      },
      data: updateAlertDto,
    });
  }

  remove(id: string, user: any) {
    return this.prisma.alert.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  }
}
