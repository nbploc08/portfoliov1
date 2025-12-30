import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class TokensService {
  constructor(private readonly prisma: PrismaService) {}


  findAll() {
    return this.prisma.token.findMany(
      { 
        orderBy: {
          createdAt: 'desc'      
        }
      }
    );
  }

}
