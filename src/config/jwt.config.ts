import * as jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export interface JwtPayload {
  userId: number;
  societyId: number;
  email: string;
  role: string;
}

export interface JwtTokenResponse {
  accessToken: string;
  jti: string;
}

export function generateAccessToken(payload: JwtPayload): JwtTokenResponse {
  // Generate Unique Session ID (JTI)
  const jti = randomUUID();

  // Generate JWT
  const accessToken = jwt.sign(
    {
      ...payload,
      jti,
    },
    process.env.ACCESS_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '12h',
    } as jwt.SignOptions
  );

  return {
    accessToken,
    jti,
  };
}

export function verifyToken(
  token: string,
): JwtPayload & { jti: string } {

  return jwt.verify(
    token,
    process.env.ACCESS_SECRET!,
  ) as JwtPayload & { jti: string };

}