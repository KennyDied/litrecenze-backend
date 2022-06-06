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
import { UserReview } from './user-review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(UserReview) private userReviewRepository: Repository<UserReview>,
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  async getAll(dto: SearchReviewDto) {
    const search = Object.entries(dto).filter(([,value]) => value).reduce((a, [key, value]) => {
      if (typeof value === 'string') return { ...a, [key]: ILike(`%${value.toLowerCase()}%`) }
      return { ...a, [key]: value };
    }, {});

    const result = await this.reviewRepository.find({
      where: {
        book: {
          ...search,
        },
      },
      relations: {
        user: true,
        book: true,
        rateOfUsers: true,
      }
    });

    result.forEach(review => {
      let result = review.rateOfUsers.reduce((a, v) => a + v.rate, 0) / review.rateOfUsers.length;
      console.log(result)
      if (isNaN(result)) {
        console.log(result)
        // @ts-ignore
        review.rateOfUsers = 0;
      } else {
        // @ts-ignore
        review.rateOfUsers = result;
      }
    });

    return result;
  }

  async getByID(id: number) {
    const result = await this.reviewRepository.findOne({
      where: {
        id
      },
      relations: {
        book: true,
        user: true,
        rateOfUsers: true,
      }
    });

    const value = result.rateOfUsers.reduce((a, v) => a + v.rate, 0) / result.rateOfUsers.length;
    if (isNaN(value)) {
      // @ts-ignore
      result.rateOfUsers = 0;
    } else {
      // @ts-ignore
      result.rateOfUsers = value;
    }
    return result;
  }

  async like(userId: number, reviewId: number, rate: number) {
    const user = await this.usersService.getUser(userId);
    const review = await this.reviewRepository.findOne({
      where: {
        id: reviewId,
      },
      relations: {
        rateOfUsers: {
          user: true,
        },
        user: true,
      }
    });
    if (!review.rateOfUsers) {
      review.rateOfUsers = [];
    } else {
      const isExists = review.rateOfUsers.some((r) => r.user.id === user.id);
      if (isExists) {
        throw new HttpException('Оценка уже стоит', 400);
      }
    }

    const userReview = await this.userReviewRepository.create({ rate });
    userReview.user = user;
    await this.userReviewRepository.save(userReview);
    review.rateOfUsers.push(userReview);
    return await this.reviewRepository.save(review);
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

