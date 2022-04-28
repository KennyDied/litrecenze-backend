import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create/create-role.dto';
import { UpdateRoleDto } from '../dto/update/update-role.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':value')
  @Roles('USER')
  async getRoleBy(@Param('value') value: string) {
    return await this.rolesService.getRole(value);
  }

  @Get()
  @Roles('ADMIN')
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