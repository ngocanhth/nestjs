import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import Address from './address.entity';
import { AddressesService } from './address.service';
import { FilesModule } from '@/files/files.module';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Address]),
    FilesModule
  ],
  providers: [UsersService, AddressesService],
  exports: [UsersService, AddressesService],
  controllers: [UsersController]
})
export class UsersModule {}