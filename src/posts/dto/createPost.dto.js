"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePostDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var CreatePostDto = /** @class */ (function () {
    function CreatePostDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'TITLE', required: true }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.Validate)(typeorm_1.Unique)
    ], CreatePostDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'EMAIL', required: true }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.MinLength)(4)
    ], CreatePostDto.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'url', required: true }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.IsUrl)(undefined, { message: 'Post URL is not valid.' })
    ], CreatePostDto.prototype, "url");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreatePostDto.prototype, "content");
    __decorate([
        (0, class_validator_1.IsOptional)()
    ], CreatePostDto.prototype, "category");
    return CreatePostDto;
}());
exports.CreatePostDto = CreatePostDto;
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
