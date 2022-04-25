import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { USER_ALREADY_EXISTS } from '../errors/users.eror';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (user) throw new HttpException(USER_ALREADY_EXISTS, HttpStatus.CONFLICT);

    return this.userRepository.create(dto);
  }

  async getAll() {
    return this.userRepository.find();
  }
}