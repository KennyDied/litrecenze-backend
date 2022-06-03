import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateAuthorDto } from './dto/update-author.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Get()
  async getAll() {
    return await this.authorsService.getAll();
  }

  @Get(':id')
  async getAuthorById(@Param('id') id: number) {
    return await this.authorsService.getById(id);
  }

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAuthor(@Body() dto: CreateAuthorDto) {
    return await this.authorsService.create(dto);
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateAuthorDto) {
    return await this.authorsService.update(id, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.authorsService.delete(id);
  }
}
