import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '../configs/jwt.config';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: jwtConfig,
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    UsersModule,
    PassportModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}