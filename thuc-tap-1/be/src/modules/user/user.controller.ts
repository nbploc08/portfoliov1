import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDTO } from '@/modules/user/dto/update-user.dto';
import { UserService } from '@/modules/user/user.service';
import { MESSAGE_KEYS } from '@/share/messages';
import { successResponse, listResponse } from '@/share/response';
import {
  GET_ALL_USERS_OPERATION,
  GET_ALL_USERS_RESPONSE,
  GET_USER_BY_ID_OPERATION,
  GET_USER_BY_ID_PARAM,
  GET_USER_BY_ID_RESPONSE,
  GET_USER_BY_ID_404_RESPONSE,
  CREATE_USER_OPERATION,
  CREATE_USER_BODY,
  CREATE_USER_RESPONSE,
  CREATE_USER_400_RESPONSE,
  UPDATE_USER_OPERATION,
  UPDATE_USER_PARAM,
  UPDATE_USER_BODY,
  UPDATE_USER_RESPONSE,
  UPDATE_USER_404_RESPONSE,
  DELETE_USER_OPERATION,
  DELETE_USER_PARAM,
  DELETE_USER_RESPONSE,
  DELETE_USER_404_RESPONSE,
} from '@/modules/user/swagger/user.swagger';

@ApiTags('Quản lý người dùng')
@Controller('users')
export class UserController {}
