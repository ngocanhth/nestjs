
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsUrl, MinLength, Validate } from 'class-validator';
import { Unique } from 'typeorm';
export class UpdatePostDto {
    @ApiProperty({description: 'EMAIL', required: true})
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsNotEmpty()
    @Validate(
        Unique
      )
    title: string;

    @ApiProperty({description: 'url', required: true})
    @IsString()
    @MinLength(4)
    @IsUrl(undefined, { message: 'Post URL is not valid.' })
    public url: string;
}