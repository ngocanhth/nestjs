"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var user_entity_1 = require("../../users/user.entity");
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Post = /** @class */ (function () {
    function Post() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Post.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
        (0, class_validator_1.IsNotEmpty)()
    ], Post.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)()
    ], Post.prototype, "content");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 255 })
    ], Post.prototype, "url");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Post.prototype, "category");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1["default"]; }, function (author) { return author.posts; })
    ], Post.prototype, "author");
    Post = __decorate([
        (0, typeorm_1.Entity)()
    ], Post);
    return Post;
}());
exports["default"] = Post;
