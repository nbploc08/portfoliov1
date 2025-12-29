import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { formatMessage, MESSAGE_KEYS } from '@/share/messages';
import { PortfolioAsset } from '@prisma/client';
import { successResponse } from '@/share/response';

@Injectable()
export class AssetService {
  constructor(private readonly prisma: PrismaService) {}
  async portfolioExists(portfolioId: string) {
    return this.prisma.portfolio.findUnique({
      where: { id: portfolioId },
    });
  }

  async tokenPortfolioUnique(tokenId: string, portfolioId: string) {
    return this.prisma.portfolioAsset.findUnique({
      where: { portfolioId_tokenId: { portfolioId, tokenId } },
    });
  }

  async authenticateUser(userId: string, portfolioId: string) {
    return this.prisma.portfolio.findUnique({
      where: { id: portfolioId, userId },
    });
  }
  async tokenExists(tokenId: string) {
    return this.prisma.token.findUnique({
      where: { id: tokenId },
    });
  }

  async createOrUpdate(createAssetDto: CreateAssetDto, user: any) {
    const { portfolioId, tokenId, amount } = createAssetDto;
    // authen user
    const authenticateUser = await this.authenticateUser(user.id, portfolioId);
    if (!authenticateUser) {
      throw new BadRequestException('Khong co quyen truy cap portfolio');
    }
    // check token exists
    const tokenExists = await this.tokenExists(tokenId);
    if (!tokenExists) {
      throw new BadRequestException('Token not found');
    }
    // check portfolio exists
    const portfolioExists = await this.portfolioExists(portfolioId);
    if (!portfolioExists) {
      throw new BadRequestException('Portfolio not found');
    }
    // check token portfolio unique
    const tokenPortfolioUnique = await this.tokenPortfolioUnique(
      tokenId,
      portfolioId,
    );

    // create or update asset
    if (tokenPortfolioUnique) {
      if (tokenPortfolioUnique.amount + amount > 0) {
        return await this.prisma.portfolioAsset.update({
          where: { portfolioId_tokenId: { portfolioId, tokenId } },
          data: { amount: tokenPortfolioUnique.amount + amount },
        });
      } else {
        throw new BadRequestException('Amount must be greater than balance');
      }
    } else if (!tokenPortfolioUnique && amount > 0) {
      return await this.prisma.portfolioAsset.create({
        data: { portfolioId, tokenId, amount },
      });
    } else {
      throw new BadRequestException('Create :Amount must be greater than 0');
    }
  }

  async sellAll(data: UpdateAssetDto, user: any) {
    const { portfolioId, tokenId } = data;
    const authenticateUser = await this.authenticateUser(
      user.id,
      portfolioId || '',
    );
    if (!authenticateUser) {
      throw new BadRequestException('Khong co quyen truy cap portfolio');
    }
    const asset = await this.prisma.portfolioAsset.findUnique({
      where: {
        portfolioId_tokenId: {
          portfolioId: portfolioId || '',
          tokenId: tokenId || '',
        },
      },
    });
    if (!asset) {
      throw new BadRequestException('Asset not found');
    }
    return this.prisma.portfolioAsset.update({
      where: {
        portfolioId_tokenId: {
          portfolioId: portfolioId || '',
          tokenId: tokenId || '',
        },
      },
      data: { amount: 0 },
    });
  }
}
