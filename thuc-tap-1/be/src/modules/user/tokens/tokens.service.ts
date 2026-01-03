import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AxiosService } from '@/modules/common/axios/axios.service';

@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly axiosService: AxiosService,
  ) {}

  findAll() {
    return this.prisma.token.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async createTokens() {
    const tokens = await this.axiosService.getMarketListings();
    const token = tokens.data.map((token: any) => {
      return {
        symbol: token.symbol,
        name: token.name,
      };
    });
    const result = await this.prisma.token.createMany({
      data: token,
    });
    return result;
  }
}
