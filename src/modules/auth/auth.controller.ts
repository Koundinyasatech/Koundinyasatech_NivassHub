import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth.service';

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
}