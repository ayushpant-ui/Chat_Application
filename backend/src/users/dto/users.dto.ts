import {
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UsernameDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  username!: string;
}

export class PasswordDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  currentPassword!: string;

@IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(128)
  newPassword!: string;
}

export class ProfileDTO {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  avatarUrl?: string;
}
