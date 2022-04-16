import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../configs/orm.config';
import { UsersModule } from './users.module';
import { RolesModule } from './roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
