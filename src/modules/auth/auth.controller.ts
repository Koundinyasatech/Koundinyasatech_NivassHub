import { Controller, Post, Body, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RoleGuard } from '../../common/guards/role.guard';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('admin')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Req() request: any) {
    const deviceInfo = request.headers['user-agent'] || 'Unknown Device';
    const ipAddress = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    return this.authService.login(loginDto, deviceInfo, ipAddress);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Req() request: any) {
    const jti = request.jti;
    return this.authService.logout(jti);
  }

  @Post('create-society-admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('SUPER_ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createSocietyAdmin(@Body() createAdminDto: CreateAdminDto, @Req() request: any) {
    const user = request.user;
    return this.authService.createUser(createAdminDto, user);
  }

  @Post('create-admin')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('SOCIETY_ADMIN')
  @HttpCode(HttpStatus.CREATED)
  async createAdmin(@Body() createAdminDto: CreateAdminDto, @Req() request: any) {
    const user = request.user;
    return this.authService.createUser(createAdminDto, user);
  }
}