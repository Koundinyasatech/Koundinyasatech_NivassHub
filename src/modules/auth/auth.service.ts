import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { AuthRepository } from './auth.repository';

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
      console.error('Invalid JSON received from database:', error);

      throw new InternalServerErrorException(
        'Invalid response received from database',
      );
    }
  }
}