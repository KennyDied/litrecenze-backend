import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create/create-user.dto';
import { USER_ALREADY_EXISTS } from '../errors/users.eror';
import { RolesService } from './roles.service';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private rolesService: RolesService,
    private configService: ConfigService,
  ) {
    (async () => {
      const initAdmin = configService.get<boolean>('INJECT_ADMIN');
      if (initAdmin) {
        const adminEmail = configService.get<string>('ADMIN_EMAIL');
        const adminPass = configService.get<string>('ADMIN_PASSWORD');

        // Если Админ существует - не создаем новый
        const admin = userRepository.findOne({ where: { email: adminEmail } });
        if (admin) return;

        if (adminEmail && adminPass) {
          const admin = userRepository.create({
            email: adminEmail,
            passwordHash: await hash(adminPass, 10),
            name: 'Администратор',
            secondName: '',
            phone: '',
          });
          admin.roles = [await rolesService.getRole('ADMIN')];
          await userRepository.save(admin);
        }
      }
    })();
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.findOne({where: {email: dto.email}});
    if (user) throw new HttpException(USER_ALREADY_EXISTS, HttpStatus.CONFLICT);

    const newUser = await this.userRepository.create(dto);
    const userRole = await this.rolesService.getRole('USER');

    newUser.roles = [userRole];

    return this.userRepository.save(newUser);
  }

  async getAll() {
    return this.userRepository.find();
  }
}