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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAll(
    @Query('authorId') authorId: number,
    @Query('title') title: string,
    @Query('rate') rate: number,
  ) {
    return await this.booksService.getAll({ authorId, title, rate });
  }

  @Get('news')
  async getNews() {
    return await this.booksService.getNews();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.booksService.getById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBook(@Body() dto: CreateBookDto) {
    return await this.booksService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.booksService.delete(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateBookDto) {
    return await this.booksService.update(id, dto);
  }
}
