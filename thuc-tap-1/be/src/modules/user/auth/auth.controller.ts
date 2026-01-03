import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Public } from '@/modules/common/decorator/metadata.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản mới' })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: 'Đăng ký thành công' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập lấy access token' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ description: 'Đăng nhập thành công, trả về token' })
  signIn(@Body() signInDto: RegisterDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
