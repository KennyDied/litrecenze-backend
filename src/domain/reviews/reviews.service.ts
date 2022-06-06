import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ILike, Like, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateReviewDto } from './dto/create-review.dto';
import * as moment from 'moment';
import { BooksService } from '../books/books.service';
import { SearchReviewDto } from './dto/search-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async getAll(dto: SearchReviewDto) {
    const search = Object.entries(dto).filter(([,value]) => value).reduce((a, [key, value]) => {
      if (typeof value === 'string') return { ...a, [key]: ILike(`%${value.toLowerCase()}%`) }
      return { ...a, [key]: value };
    }, {});

    return await this.reviewRepository.find({
      where: {
        book: {
          ...search,
        },
      },
      relations: ['user', 'book']
    });
  }

  async getByID(id: number) {
    return await this.reviewRepository.findOne({
      where: {
        id
      },
      relations: {
        book: true,
        user: true,
      }
    })
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

  async remove(id: number) {
    return await this.reviewRepository.delete(id);
  }

  async update(id: number, dto: UpdateReviewDto) {
    return await this.reviewRepository.update(id, dto);
  }
}

