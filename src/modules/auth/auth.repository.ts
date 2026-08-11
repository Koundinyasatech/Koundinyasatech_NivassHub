import { Injectable } from '@nestjs/common';
import { poolPromise, sql } from '../../config/database.config';

@Injectable()
export class AuthRepository {
  async getRolePermissions(role: string): Promise<any[]> {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Role', sql.NVarChar, role)
      .execute('USP_GET_ROLE_PERMISSIONS');
    return result.recordset;
  }

  async login(email: string, password: string): Promise<any> {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('Email', sql.NVarChar, email)
      .input('Password', sql.NVarChar, password) // Plain password sent to DB
      .execute('USP_ADMIN_LOGIN');
    return result.recordset[0];
  }

  async createSession(data: {
    societyId: number;
    userId: number;
    jti: string;
    deviceInfo: string;
    ipAddress: string;
  }): Promise<void> {
    const pool = await poolPromise;
    await pool
      .request()
      .input('SocietyId', sql.Int, data.societyId)
      .input('UserId', sql.Int, data.userId)
      .input('Jti', sql.UniqueIdentifier, data.jti)
      .input('DeviceInfo', sql.NVarChar(500), data.deviceInfo)
      .input('IPAddress', sql.NVarChar(100), data.ipAddress)
      .execute('USP_CREATE_SESSION');
  }

  async saveLoginHistory(data: {
    societyId: number;
    userId: number;
    ipAddress: string;
    deviceInfo: string;
  }): Promise<void> {
    const pool = await poolPromise;
    await pool
      .request()
      .input('SocietyId', sql.Int, data.societyId)
      .input('UserId', sql.Int, data.userId)
      .input('IPAddress', sql.NVarChar(100), data.ipAddress)
      .input('DeviceInfo', sql.NVarChar(500), data.deviceInfo)
      .execute('USP_SAVE_LOGIN_HISTORY');
  }

  async deleteSession(jti: string): Promise<void> {
    const pool = await poolPromise;
    await pool
      .request()
      .input('Jti', sql.UniqueIdentifier, jti)
      .execute('USP_DELETE_SESSION');
  }

  async getAdminByEmail(societyId: number, email: string): Promise<any> {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('SocietyId', sql.Int, societyId)
      .input('Email', sql.NVarChar, email)
      .execute('USP_GET_ADMIN_BY_EMAIL');
    return result.recordset[0];
  }

  async createUser(data: {
    societyId: number;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    password: string; 
    role: string;
    createdBy: number;
  }): Promise<any> {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('SocietyId', sql.Int, data.societyId)
      .input('FirstName', sql.NVarChar, data.firstName)
      .input('LastName', sql.NVarChar, data.lastName)
      .input('Email', sql.NVarChar, data.email)
      .input('MobileNumber', sql.NVarChar, data.mobileNumber)
      .input('Password', sql.NVarChar, data.password) // Plain password sent to DB
      .input('Role', sql.NVarChar, data.role)
      .input('CreatedBy', sql.Int, data.createdBy)
      .execute('USP_CREATE_USER');
    return result.recordset[0];
  }
}