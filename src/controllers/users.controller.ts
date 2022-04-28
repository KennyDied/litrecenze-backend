import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(
    @Query('firstName') firstName: string,
    @Query('secondName') secondName: string,
    @Query('email') email: string,
  ) {
    if (firstName || secondName || email) {
      return (await this.usersService.searchUsers({ firstName, secondName, email })).map(({passwordHash, phone, ...result}) => result);
    }
    return (await this.usersService.getAll()).map(({ passwordHash, ...result }) => result);
  }

  @Patch('permission/:id')
  async addAdminPermission(@Param('id') id: number) {
    return await this.usersService.addAdminPermission(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
  }
}