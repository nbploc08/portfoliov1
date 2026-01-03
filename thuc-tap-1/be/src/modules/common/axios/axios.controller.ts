import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AxiosService } from './axios.service';
import { Public } from '../decorator/metadata.decorator';

@ApiTags('Axios')
@Controller('axios')
export class AxiosController {
  constructor(private readonly axiosService: AxiosService) {}

  @Get('listings')
  @Public()
  @ApiOperation({ summary: 'Lấy danh sách market listings công khai' })
  @ApiOkResponse({ description: 'Danh sách market listings được trả về' })
  async getMarket() {
    return this.axiosService.getMarketListings();
  }
}
