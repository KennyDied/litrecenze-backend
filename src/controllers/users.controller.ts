import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('ADMIN')
  @Patch('permission/:id')
  async addAdminPermission(@Param('id') id: number) {
    return await this.usersService.addAdminPermission(id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    await this.usersService.deleteUser(id);
  }
}
