import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AxiosService } from './axios.service';
import { CreateAxioDto } from './dto/create-axio.dto';
import { UpdateAxioDto } from './dto/update-axio.dto';
import { Public } from '../decorator/metadata.decorator';

@Controller('axios')
export class AxiosController {
  constructor(private readonly axiosService: AxiosService) {}

  @Get('listings')
  @Public()
  async getMarket() {
    return this.axiosService.getMarketListings();
  }
}
