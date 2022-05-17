import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateReviewDto) {
    return await this.reviewsService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.reviewsService.remove(id);
  }
}
