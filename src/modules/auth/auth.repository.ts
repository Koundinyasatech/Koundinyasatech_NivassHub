import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { poolPromise } from '../../config/database.config';

@Injectable()
export class AuthRepository {
  async getActiveSocietyNames(): Promise<string> {
    try {
      const pool = await poolPromise;

      const result = await pool
        .request()
        .execute('dbo.usp_GetActiveSocietyNamesJSON');

      const jsonResult = result.recordset?.[0]?.Result;

      if (!jsonResult) {
        throw new InternalServerErrorException(
          'No response received from database',
        );
      }

      return jsonResult;
    } catch (error) {
      console.error(
        'Error executing usp_GetActiveSocietyNamesJSON:',
        error,
      );

      throw new InternalServerErrorException(
        'Failed to fetch active societies',
      );
    }
  }
}