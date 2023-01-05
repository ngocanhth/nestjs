import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type, Type as ValidateType } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEmail, IsNumber, IsOptional, IsString, Min, MinLength, ValidateNested } from 'class-validator';
export class CreatePostDto {
    @ApiProperty({description: 'TITLE', required: true})
    @IsString()
    @MinLength(4)
    public title!: string;
  
    @ApiProperty({description: 'EMAIL', required: true})
    @IsEmail()
    @MinLength(4)
    public email!: string;
  
    @ApiProperty({description: 'url', required: true})
    @IsString()
    @MinLength(4)
    @IsUrl(undefined, { message: 'Post URL is not valid.' })
    public url!: string;
  
//    @ApiProperty({description: 'tags', required: false, type:[PostTag]})
//    @IsOptional()
//    @IsArray()
//    @ValidateNested()
//    @ArrayMinSize(1)
//    @ValidateType(() => PostTag)
//    public tags?: PostTag [];
  }


// export class CreatePostDto {
//   @IsNotEmpty()
//   title: string;
//   description: string;
//   content: string;
//   user: string;
//   categories: [string];
// }

// export class UpdatePostDto {
//   @IsNotEmpty()
//   id: number;
//   content: string;
//   @IsNotEmpty()
//   title: string;
// }

// export class PaginationPostDto {
//   @IsNotEmpty()
//   page: number;

//   @IsNotEmpty()
//   limit: number;

//   @IsNotEmpty()
//   start: string;
// }
