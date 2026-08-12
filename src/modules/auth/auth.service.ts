import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { FastifyRequest } from 'fastify';

import { AuthRepository } from './auth.repository';
import { AdminLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  async getActiveSocietyNames() {
    const result =
      await this.authRepository.getActiveSocietyNames();

    try {
      return JSON.parse(result);
    } catch (error) {
      console.error(
        'Invalid JSON received from database:',
        error,
      );

      throw new InternalServerErrorException(
        'Invalid response received from database',
      );
    }
  }

  async adminLogin(
    loginDto: AdminLoginDto,
    request: FastifyRequest,
  ) {
    // Get IP Address
    const forwardedFor =
      request.headers['x-forwarded-for'];

    const ipAddress =
      typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0].trim()
        : request.ip;

    // Get Device Information
    const deviceInfo =
      request.headers['user-agent'] || '';

    console.log('----- ADMIN LOGIN -----');
    console.log('UserName:', loginDto.UserName);
    console.log('SocietyID:', loginDto.SocietyID);
    console.log('IPAddress:', ipAddress);
    console.log('DeviceInfo:', deviceInfo);

    return this.authRepository.adminLogin({
      UserName: loginDto.UserName,
      Password: loginDto.Password,
      IPAddress: ipAddress,
      SocietyID: loginDto.SocietyID,
      DeviceInfo: deviceInfo,
    });
  }
}