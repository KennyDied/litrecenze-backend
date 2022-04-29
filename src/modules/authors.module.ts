import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { AuthorsService } from '../services/authors.service';
import { AuthorsController } from '../controllers/authors.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author]),
    forwardRef(() => AuthModule)
  ],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [],
})
export class AuthorsModule {}
