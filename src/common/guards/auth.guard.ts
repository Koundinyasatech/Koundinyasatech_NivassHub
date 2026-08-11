import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from '../../config/jwt.config';
import { poolPromise, sql } from '../../config/database.config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token is missing.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = verifyToken(token);
      const jti = decoded.jti;

      const pool = await poolPromise;

      const sessionResult = await pool
        .request()
        .input('Jti', sql.UniqueIdentifier, jti)
        .execute('USP_GET_SESSION');

      const session = sessionResult.recordset[0];

      if (!session) {
        throw new UnauthorizedException('Session not found. Please login again.');
      }

      if (!session.IsActive) {
        throw new UnauthorizedException('Session expired.');
      }

      const currentTime = new Date();
      const lastActivity = new Date(session.LastActivity);
      const idleMinutes = (currentTime.getTime() - lastActivity.getTime()) / (1000 * 60);
      const SESSION_TIMEOUT = Number(process.env.SESSION_IDLE_TIMEOUT) || 30;

      if (idleMinutes >= SESSION_TIMEOUT) {
        await pool
          .request()
          .input('Jti', sql.UniqueIdentifier, jti)
          .execute('USP_DELETE_SESSION');

        throw new UnauthorizedException(
          'Your session has expired due to inactivity. Please login again.'
        );
      }

      await pool
        .request()
        .input('Jti', sql.UniqueIdentifier, jti)
        .execute('USP_UPDATE_LAST_ACTIVITY');

      request.user = decoded;
      request.token = token;
      request.jti = jti;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid or Expired Token.');
    }
  }
}