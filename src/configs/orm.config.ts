import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('PG_HOST'),
  port: +configService.get('PG_PORT'),
  database: configService.get('PG_DATABASE') as string,
  username: configService.get('PG_USERNAME'),
  password: configService.get('PG_PASSWORD'),
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true,
});
