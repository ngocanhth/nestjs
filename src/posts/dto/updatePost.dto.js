"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdatePostDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var typeorm_1 = require("typeorm");
var UpdatePostDto = /** @class */ (function () {
    function UpdatePostDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'EMAIL', required: true }),
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.MinLength)(4)
    ], UpdatePostDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.Validate)(typeorm_1.Unique)
    ], UpdatePostDto.prototype, "title");
    __decorate([
        (0, swagger_1.ApiProperty)({ description: 'url', required: true }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.IsUrl)(undefined, { message: 'Post URL is not valid.' })
    ], UpdatePostDto.prototype, "url");
    return UpdatePostDto;
}());
exports.UpdatePostDto = UpdatePostDto;
