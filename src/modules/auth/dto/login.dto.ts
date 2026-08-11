import { IsNotEmpty, IsString } from 'class-validator';

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  UserName: string;

  @IsString()
  @IsNotEmpty()
  Password: string;

  @IsNotEmpty()
  SocietyID: number;
}