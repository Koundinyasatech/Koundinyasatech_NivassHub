import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  IsIn, 
  MinLength, 
  MaxLength, 
  IsMobilePhone,
  IsOptional,
  IsNumber,
  ValidateIf
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsMobilePhone()
  @MinLength(10)
  @MaxLength(15)
  mobileNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['SOCIETY_ADMIN', 'COMMITTEE_MEMBER', 'TREASURER', 'SECURITY_ADMIN'])
  role: string;

  @IsOptional()
  @IsNumber()
  societyId?: number;
}