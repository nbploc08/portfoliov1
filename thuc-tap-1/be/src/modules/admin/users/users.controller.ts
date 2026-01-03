import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@/modules/common/decorator/user.decorator';
import { Public } from '@/modules/common/decorator/metadata.decorator';
import { UserRole } from '@/share/enum';
import { Roles } from '@/modules/common/decorator/roles.decorator';

@ApiTags('Admin - Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Tạo người dùng mới (ADMIN)' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Tạo người dùng thành công' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Get()
  @ApiOperation({ summary: 'Lấy danh sách người dùng' })
  @ApiOkResponse({ description: 'Danh sách người dùng' })
  findAll(@Req() request: Request, @User() user: any) {
    console.log(user);
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiParam({ name: 'id', description: 'ID người dùng' })
  @ApiOkResponse({ description: 'Thông tin người dùng' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Patch(':id')
  @ApiOperation({ summary: 'Cập nhật người dùng' })
  @ApiParam({ name: 'id', description: 'ID người dùng' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'Người dùng đã được cập nhật' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa người dùng' })
  @ApiParam({ name: 'id', description: 'ID người dùng' })
  @ApiResponse({ status: 204, description: 'Xóa thành công' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
