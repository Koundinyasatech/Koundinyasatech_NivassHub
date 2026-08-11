import { Injectable, UnauthorizedException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { generateAccessToken } from '../../config/jwt.config';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async login(loginDto: LoginDto, deviceInfo: string, ipAddress: string) {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and Password are required.');
    }

    
    const user = await this.authRepository.login(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password.');
    }

    const permissionResult = await this.authRepository.getRolePermissions(user.Role);
    const permissions = permissionResult.map((permission) => permission.ModuleName);

    const payload = {
      userId: user.UserId,
      societyId: user.SocietyId,
      email: user.Email,
      role: user.Role,
    };

    const { accessToken, jti } = generateAccessToken(payload);

    await this.authRepository.createSession({
      societyId: user.SocietyId,
      userId: user.UserId,
      jti,
      deviceInfo,
      ipAddress,
    });

    await this.authRepository.saveLoginHistory({
      societyId: user.SocietyId,
      userId: user.UserId,
      ipAddress,
      deviceInfo,
    });

    return {
      success: true,
      message: 'Login successful.',
      data: {
        accessToken,
        user: {
          userId: user.UserId,
          societyId: user.SocietyId,
          societyName: user.SocietyName,
          firstName: user.FirstName,
          lastName: user.LastName,
          email: user.Email,
          role: user.Role,
          permissions,
        },
      },
    };
  }

  async logout(jti: string) {
    await this.authRepository.deleteSession(jti);
    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }

  async createUser(createAdminDto: CreateAdminDto, creator: any) {
    const { firstName, lastName, email, mobileNumber, password, role } = createAdminDto;
    const societyId = creator.societyId;

    if (!firstName || !lastName || !email || !mobileNumber || !password || !role) {
      throw new BadRequestException('All fields are required.');
    }

    if (creator.role === 'SUPER_ADMIN') {
      if (role !== 'SOCIETY_ADMIN') {
        throw new ForbiddenException('SUPER_ADMIN can only create SOCIETY_ADMIN.');
      }
    } else if (creator.role === 'SOCIETY_ADMIN') {
      const allowedRoles = ['COMMITTEE_MEMBER', 'TREASURER', 'SECURITY_ADMIN'];
      if (!allowedRoles.includes(role)) {
        throw new ForbiddenException('Invalid Role.');
      }
    } else {
      throw new ForbiddenException('You do not have permission.');
    }

    // Check existing user
    const existingUser = await this.authRepository.getAdminByEmail(societyId, email);
    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }

    // Send plain password to DB - DB will handle hashing
    const newUser = await this.authRepository.createUser({
      societyId,
      firstName,
      lastName,
      email,
      mobileNumber,
      password, // Plain password sent to DB
      role,
      createdBy: creator.userId,
    });

    return {
      success: true,
      message: 'User created successfully.',
      data: newUser,
    };
  }
}