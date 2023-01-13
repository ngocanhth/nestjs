import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/createUser.dto';
import Address from './address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>
  ) {}

  // lấy tất cả địa chỉ với người dùng.
  async getAllAddressesWithUsers() {
    return this.addressRepository.find({ relations: ['user'] });
  }
}
