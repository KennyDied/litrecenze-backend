import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create/create-role.dto';
import { ROLE_ALREADY_EXISTS } from '../errors/roles.error';
import { UpdateRoleDto } from '../dto/update/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>) {}

  async getRole(value: string) {
    return await this.rolesRepository.findOne({
      where: { value },
    });
  }

  async getAll() {
    return await this.rolesRepository.find();
  }

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.findOne({ where: { value: dto.value } });
    if (role) throw new HttpException(ROLE_ALREADY_EXISTS, HttpStatus.CONFLICT);

    return this.rolesRepository.save(dto);
  }

  async deleteRole(id: number) {
    return this.rolesRepository.delete(id);
  }

  async updateRole(id: number, dto: UpdateRoleDto) {
    return await this.rolesRepository.update(id, dto);
  }
}