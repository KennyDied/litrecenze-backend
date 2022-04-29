import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../configs/orm.config';
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { RolesModule } from './roles.module';
import { AuthorsModule } from './authors.module';
import { BooksModule } from './books.module';

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
  ],
})
export class AppModule {}
