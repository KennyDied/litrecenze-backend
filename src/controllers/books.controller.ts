import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto } from '../dto/create/create-book.dto';
import { UpdateBookDto } from '../dto/update/update-book.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAll(
    @Query('authorId') authorId: number,
    @Query('title') title: string,
  ) {
    return await this.booksService.getAll({ authorId, title });
  }

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() dto: CreateBookDto) {
    return await this.booksService.create(dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.booksService.delete(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return await this.booksService.update(id, dto);
  }
}
