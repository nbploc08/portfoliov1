import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { User } from '@/modules/common/decorator/user.decorator';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto, @User() user: any) {
    return this.assetService.createOrUpdate(createAssetDto, user);
  }

  @Delete()
  sellAll(@Body() data: UpdateAssetDto, @User() user: any) {
    return this.assetService.sellAll(data, user);
  }
}
