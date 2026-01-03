import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { User } from '@/modules/common/decorator/user.decorator';
import { UserRole } from '@/share/enum';
import { Roles } from '@/modules/common/decorator/roles.decorator';

@ApiTags('Portfolios')
@ApiBearerAuth()
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo danh mục đầu tư mới' })
  @ApiBody({ type: CreatePortfolioDto })
  @ApiOkResponse({ description: 'Danh mục đã được tạo' })
  create(@Body() createPortfolioDto: CreatePortfolioDto, @User() user: any) {
    return this.portfoliosService.create(createPortfolioDto, user);
  }

  @Get()
  @Roles(UserRole.USER)
  @ApiOperation({ summary: 'Người dùng xem danh sách danh mục của mình' })
  @ApiOkResponse({ description: 'Danh sách danh mục đầu tư' })
  userFindAll(@User() user: any) {
    return this.portfoliosService.findAll(user);
  }

  @Get('admin/:id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin xem danh mục của người dùng theo ID' })
  @ApiParam({ name: 'id', description: 'ID người dùng' })
  @ApiOkResponse({ description: 'Danh sách danh mục của người dùng' })
  adminFindAll(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.findPortfolio(id, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết danh mục' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiOkResponse({ description: 'Chi tiết danh mục' })
  findOne(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.findPortfolio(id, user);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật danh mục' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiBody({ type: UpdatePortfolioDto })
  @ApiOkResponse({ description: 'Danh mục đã được cập nhật' })
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @User() user: any,
  ) {
    return this.portfoliosService.update(id, updatePortfolioDto, user);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa danh mục' })
  @ApiParam({ name: 'id', description: 'ID danh mục' })
  @ApiOkResponse({ description: 'Danh mục đã được xóa' })
  remove(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.remove(id, user);
  }
}
