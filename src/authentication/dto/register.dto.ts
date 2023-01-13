import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty, MinLength, ValidateNested, IsOptional, MaxLength, IsNotEmptyObject, IsDefined } from 'class-validator';
import AddressDto from './address.dto';
import { EmailNotRegistered } from './validation-rules/email-not-registered.rule';

export class RegisterDto {
  @IsEmail()
  @MinLength(8)
  //@EmailNotRegistered({ message: 'email already registered' })
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  password: string;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => AddressDto)
  @ValidateNested()

  address: AddressDto;
}

export default RegisterDto;