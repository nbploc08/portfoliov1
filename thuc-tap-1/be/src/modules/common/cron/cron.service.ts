import { Injectable } from '@nestjs/common';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AxiosService } from '../axios/axios.service';

@Injectable()
export class CronService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly axiosService: AxiosService,
  ) {}

  async getPriceTokens() {
    const tokens = await this.axiosService.getMarketListings();
    const token = tokens.data.map((token: any) => {
      return {
        symbol: token.symbol,
        name: token.name,
        price: token.quote.USD.price,
      };
    });

    return token;
  }

  async updateTokens(tokens: any[]) {
    const tokensData = tokens.map((token) => {
      return {
        symbol: token.symbol,
        name: token.name,
      };
    });
    const currentTokens = await this.prisma.token.findMany({
      select: {
        symbol: true,
        name: true,
      },
    });
    const setA = new Set(
      currentTokens.map((item) => `${item.symbol}|${item.name}`),
    );

    const data = tokensData.filter(
      (item) => !setA.has(`${item.symbol}|${item.name}`),
    );

    const result = await this.prisma.token.createMany({
      data: data,
    });

    return result;
  }

  @Cron('*/80 * * * * *')
  async updatePriceTokens() {
    const priceTokens = await this.getPriceTokens();
    await this.updateTokens(priceTokens);
    const data = await Promise.all(
      priceTokens.map(async (token: any) => {
        const tokenId = await this.prisma.token.findFirst({
          where: {
            symbol: token.symbol,
            name: token.name,
          },
        });
        return {
          price: token.price,
          tokenId: tokenId?.id,
        };
      }),
    );
    // const tokenIds = await this.prisma.token.findMany({
    //   where: {
    //     symbol: {
    //       in: priceTokens.map((token: any) => token.symbol),
    //     },
    //     name: {
    //       in: priceTokens.map((token: any) => token.name),
    //     },
    //   },
    // });

    const result = await this.prisma.tokenPrice.createMany({
      data: data,
    });
    console.log('Called every 80 seconds update price', result);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async triggerAlert() {
    const alerts = await this.prisma.alert.findMany({
      where: {
        isTriggered: false,
      },
    });
    for (const alert of alerts) {
      const tokenPrice = await this.prisma.tokenPrice.findFirst({
        where: {
          tokenId: alert.tokenId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      if (tokenPrice) {
        if (alert.condition === 'GT' && tokenPrice.price > alert.targetPrice) {
          await this.prisma.alert.update({
            where: { id: alert.id },
            data: { isTriggered: true },
          });
          console.log(`Alert ${alert.id} triggered`);
        }
        if (alert.condition === 'LT' && tokenPrice.price < alert.targetPrice) {
          await this.prisma.alert.update({
            where: { id: alert.id },
            data: { isTriggered: true },
          });
          console.log(`Alert ${alert.id} triggered`);
        }
      }
    }
  }
}
