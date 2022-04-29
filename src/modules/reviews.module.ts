import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../entities/review.enity';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { ReviewsService } from '../services/reviews.service';
import { HowIAmInterceptor } from '../interceptors/how-i-am.interceptor';
import { ReviewsController } from '../controllers/reviews.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  providers: [ReviewsService, HowIAmInterceptor],
  controllers: [ReviewsController],

})
export class ReviewsModule {}
