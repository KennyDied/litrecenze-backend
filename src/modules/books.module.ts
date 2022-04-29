import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { BooksService } from '../services/books.service';
import { AuthorsModule } from './authors.module';
import { BooksController } from '../controllers/books.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorsModule,
    forwardRef(() => AuthModule)
  ],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [],
})
export class BooksModule {}
