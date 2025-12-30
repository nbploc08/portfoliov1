import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class PriceService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPriceDto: CreatePriceDto) {
    return 'This action adds a new price';
  }

  async lastestPrice(id: string) {
    return await this.prisma.tokenPrice.findFirst({
      where: {
        tokenId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async lastestPrices() {
    const tokens = await this.prisma.token.findMany();

    const results = await Promise.all(
      tokens.map(async (token) => {
        const price = await this.lastestPrice(token.id);
        return {
          tokenId: token.id,
          symbol: token.symbol,
          price: price?.price || '',
        };
      }),
    );

    return results;
  }
}
