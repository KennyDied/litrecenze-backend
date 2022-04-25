import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    RolesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}