import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';


  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(
        private readonly userService: UsersService
    ) {}
  
    // constructor(
    //     private readonly usersService: UsersService,
    //     private readonly jwtService: JwtService,
    //     private readonly configService: ConfigService
    //   ) {}

    validate(email: string) {
      return this.userService.getByEmail(email).then((user) => {
        return user === undefined;
      });
    }
  }
  
  export function EmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailNotRegistered,
      });
    };
  }

  