import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PriceService } from './price.service';
import { Public } from '@/modules/common/decorator/metadata.decorator';
import { PriceCache } from '@/modules/common/cache/price.cache';

@ApiTags('Prices')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách giá token mới nhất (public)' })
  @ApiOkResponse({ description: 'Danh sách giá token' })
  lastestPrices() {
    // return this.priceService.lastestPrices();
    return PriceCache.getAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy giá mới nhất của token theo ID' })
  @ApiParam({ name: 'id', description: 'ID token' })
  @ApiOkResponse({ description: 'Giá mới nhất của token' })
  lastestPrice(@Param('id') id: string) {
    return this.priceService.lastestPrice(id);
  }
}
