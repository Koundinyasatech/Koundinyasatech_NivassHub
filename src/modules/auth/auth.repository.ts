import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import * as sql from 'mssql';

import { poolPromise } from '../../config/database.config';

@Injectable()
export class AuthRepository {

  // ==========================================
  // GET ACTIVE SOCIETIES
  // ==========================================

  async getActiveSocietyNames(): Promise<string> {
    try {
      const pool = await poolPromise;

      const result = await pool
        .request()
        .execute(
          'dbo.usp_GetActiveSocietyNamesJSON',
        );

      const jsonResult =
        result.recordset?.[0]?.Result;

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


  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  async adminLogin(data: {
    UserName: string;
    Password: string;
    IPAddress: string;
    SocietyID: number;
    DeviceInfo: string;
  }) {
    try {
      const pool = await poolPromise;

      const result = await pool
        .request()

        // User Name
        .input(
          'UserName',
          sql.NVarChar(255),
          data.UserName,
        )

        // Password
        .input(
          'Password',
          sql.NVarChar(255),
          data.Password,
        )

        // IP Address
        .input(
          'IPAddress',
          sql.NVarChar(50),
          data.IPAddress,
        )

        // Society ID
        .input(
          'SocietyID',
          sql.Int,
          data.SocietyID,
        )

        // Device Information
        .input(
          'DeviceInfo',
          sql.NVarChar(500),
          data.DeviceInfo,
        )

        // Stored Procedure
        .execute(
          'dbo.USP_Admin_Login',
        );

      console.log(
        'USP_Admin_Login Result:',
        result.recordset,
      );

      const response =
        result.recordset?.[0];

      if (!response) {
        throw new UnauthorizedException(
          'Invalid username or password',
        );
      }

      return {
        Status: response.Status,
        UserId: response.UserId,
        RefreshToken: response.RefreshToken,
        Message: response.Message,
      };

    } catch (error) {
      console.error(
        'Error executing USP_Admin_Login:',
        error,
      );

      if (
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to login',
      );
    }
  }
}