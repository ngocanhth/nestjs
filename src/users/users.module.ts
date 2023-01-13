import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import Address from './address.entity';
import { AddressesService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address])],
  providers: [UsersService, AddressesService],
  exports: [UsersService, AddressesService]
})
export class UsersModule {}
