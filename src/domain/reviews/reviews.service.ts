import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import * as moment from 'moment';
import { BooksService } from '../books/books.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async getAll() {
    return await this.reviewRepository.find({ relations: ['user', 'book'] });
  }

  async create(user_, dto: CreateReviewDto) {
    const reviewAuthor = await this.usersService.getUser(user_.id);
    const book = await this.booksService.getById(dto.bookId);
    if (!book) throw new HttpException('', HttpStatus.BAD_REQUEST);
    const review = this.reviewRepository.create({
      ...dto,
      createdAt: moment(),
    });
    review.book = book;
    review.user = reviewAuthor;
    const { user, ...other } = await this.reviewRepository.save(review);
    const { passwordHash, ...result } = user;
    return { ...other, user: { ...result }};
  }
}
