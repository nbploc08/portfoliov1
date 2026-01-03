import { Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokensService } from './tokens.service';
import { Public } from '@/modules/common/decorator/metadata.decorator';

@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách token đang theo dõi' })
  @ApiOkResponse({ description: 'Danh sách token' })
  findAll() {
    return this.tokensService.findAll();
  }

  @Post('create')
  @Public()
  @ApiOperation({ summary: 'Khởi tạo dữ liệu token ban đầu (public)' })
  @ApiOkResponse({ description: 'Danh sách token đã được tạo' })
  createTokens() {
    return this.tokensService.createTokens();
  }
}
