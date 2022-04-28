import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create/create-role.dto';
import { UpdateRoleDto } from '../dto/update/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':value')
  async getRoleBy(@Param('value') value: string) {
    return await this.rolesService.getRole(value);
  }

  @Get()
  async getAllRoles() {
    return await this.rolesService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.rolesService.createRole(dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(@Param() id: number) {
    await this.rolesService.deleteRole(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateRole(@Param() id: number, @Body() dto: UpdateRoleDto) {
    await this.rolesService.updateRole(id, dto);
  }
}