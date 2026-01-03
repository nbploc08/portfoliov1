import { Controller, Post, Body, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { User } from '@/modules/common/decorator/user.decorator';

@ApiTags('Assets')
@ApiBearerAuth()
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo hoặc cập nhật tài sản trong portfolio' })
  @ApiBody({ type: CreateAssetDto })
  @ApiOkResponse({ description: 'Tài sản đã được cập nhật' })
  create(@Body() createAssetDto: CreateAssetDto, @User() user: any) {
    return this.assetService.createOrUpdate(createAssetDto, user);
  }

  @Delete()
  @ApiOperation({ summary: 'Bán hết tài sản trong portfolio' })
  @ApiBody({ type: UpdateAssetDto })
  @ApiOkResponse({ description: 'Đã bán toàn bộ tài sản' })
  sellAll(@Body() data: UpdateAssetDto, @User() user: any) {
    return this.assetService.sellAll(data, user);
  }
}
