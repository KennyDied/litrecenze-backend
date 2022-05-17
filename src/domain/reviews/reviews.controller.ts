import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  async getAll(
    @Query('title') title: string,
    @Query('author') author: string,
  ) {
    return await this.reviewsService.getAll({ title, author });
  }

  @Post()
  async createReview(@Request() req, @Body() dto: CreateReviewDto) {
    return await this.reviewsService.create(req.user, dto);
  }
}
