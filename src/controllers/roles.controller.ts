import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':value')
  async getRoleBy(@Param('value') value: string) {
    return await this.rolesService.getRole(value);
  }

  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }
}