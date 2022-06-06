import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { BooksModule } from '../books/books.module';
import { UserReview } from './user-review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, UserReview]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    BooksModule,
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
