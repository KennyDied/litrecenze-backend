import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ROLE_ALREADY_EXISTS } from '../errors/roles.error';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  async getRole(value: string) {
    return await this.rolesRepository.findOne({
      where: { value },
    });
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.findOne({ where: { value: dto.value } });
    if (role) throw new HttpException(ROLE_ALREADY_EXISTS, HttpStatus.CONFLICT);

    return this.rolesRepository.save(dto);
  }
}