import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('active')
  @HttpCode(HttpStatus.OK)
  async getActiveSocietyNames() {
    return this.authService.getActiveSocietyNames();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: AdminLoginDto,
    @Req() request: FastifyRequest,
  ) {
    return this.authService.adminLogin(
      loginDto,
      request,
    );
  }
}