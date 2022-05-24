import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { AuthModule } from '../auth/auth.module';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BooksModule,
    ReviewsModule,
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}