import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RolesService } from '../services/roles.service';
import { RolesController } from '../controllers/roles.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {

}