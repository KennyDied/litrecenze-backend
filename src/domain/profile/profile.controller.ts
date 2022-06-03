import { Controller, Get, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReviewsService } from '../reviews/reviews.service';
import { Review } from '../reviews/review.entity';
import { uniqBy } from 'lodash';
import { BooksService } from '../books/books.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private usersService: UsersService,
    private reviewsService: ReviewsService,
    private booksService: BooksService,
  ) {}

  @Get()
  async me(@Request() req) {
    const payload = req.user;
    const user = await this.usersService.getUserWithRelations(payload.id);
    const { passwordHash, ...result } = user;

    return result;
  }

  @Get('books')
  async myBooks(@Request() req) {
    const payload = req.user;
    return (await this.usersService.getUserWithRelations(payload.id)).books;
  }

  @Get('reviews')
  async myReviews(@Request() req) {
    const payload = req.user;
    return (await this.usersService.getUserWithRelations(payload.id)).reviews;
  }

  @Put('book/:id')
  async addBook(@Param('id') id: number, @Request() req) {
    const payload = req.user;
    const book = await this.booksService.getById(id);
    await this.usersService.addBook(payload.id, book);
  }
}