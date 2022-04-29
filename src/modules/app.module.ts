import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../configs/orm.config';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { RolesModule } from './roles.module';
import { AuthorsModule } from './authors.module';
import { BooksModule } from './books.module';
import { ReviewsModule } from './reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    AuthorsModule,
    BooksModule,
    ReviewsModule,
  ],
})
export class AppModule {}
