import { Injectable } from '@nestjs/common';
import { CreateAxioDto } from './dto/create-axio.dto';
import { UpdateAxioDto } from './dto/update-axio.dto';
import { InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class AxiosService {
  private readonly CMC_URL =
    'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

  constructor(private readonly http: HttpService) {}

  async getMarketListings() {
    try {
      const res = await this.http.axiosRef.get(this.CMC_URL, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '',
        },
        params: {
          start: 1,
          limit: 100, // ⚠️ 100 coin = 1 credit
          convert: 'USD',
        },
      });

      return res.data;
    } catch (err) {
      throw new InternalServerErrorException('Cannot fetch market data');
    }
  }
}
