import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { User } from '@/modules/common/decorator/user.decorator';
import { UserRole } from '@/share/enum';
import { Roles } from '@/modules/common/decorator/roles.decorator';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto, @User() user: any) {
    return this.portfoliosService.create(createPortfolioDto, user);
  }

  @Get()
  @Roles(UserRole.USER)
  userFindAll(@User() user: any) {
    return this.portfoliosService.findAll(user);
  }

  @Get('admin/:id')
  @Roles(UserRole.ADMIN)
  adminFindAll(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.findPortfolio(id, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.findPortfolio(id, user);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @User() user: any,
  ) {
    return this.portfoliosService.update(id, updatePortfolioDto, user);
  }
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: any) {
    return this.portfoliosService.remove(id, user);
  }
}
