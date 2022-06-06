import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { BOOK_ALREADY_EXISTS, USER_ALREADY_EXISTS, USER_NOT_FOUND } from './users.eror';
import { RolesService } from '../roles/roles.service';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { SearchAttributesDto } from './dto/search-attributes.dto';
import { Book } from '../books/book.entity';
import { rethrow } from '@nestjs/core/helpers/rethrow';

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
        const admin = await userRepository.findOne({where: {email: adminEmail}});
        if (admin) return;

        if (adminEmail && adminPass) {
          const admin = userRepository.create({
            email: adminEmail,
            passwordHash: await hash(adminPass, 10),
            firstName: 'Администратор',
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

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({where: {email}})
  }

  async getUserWithRelations(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles', 'reviews', 'books']
    });
  }

  async getUser(id: number) {
    return await this.userRepository.findOne({ where: { id }});
  }

  async getAll() {
    return this.userRepository.find();
  }

  async addBook(userId: number, book: Book) {
    const user = await this.getUserWithRelations(userId);
    if (user.books.some(b => book.id === b.id)) {
      throw new HttpException(BOOK_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
    }
    user.books.push(book);
    return await this.userRepository.save(user);
  }

  async removeBook(id: number, user: any) {
    const currUser = await this.userRepository.findOne({
      where: { id: user.id },
      relations: {
        books: true,
      }
    });
    currUser.books = currUser.books.filter((book) => {
      return book.id != id;
    });
    return await this.userRepository.save(currUser);
  }

  async addAdminPermission(id: number) {
    const user = await this.userRepository.findOne({where: {id}, relations: ['roles']});
    const adminRole = await this.rolesService.getRole('ADMIN');
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!user.roles.includes(adminRole)) {
      user.roles.push(adminRole);
      await this.userRepository.save(user);
    }
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    await this.userRepository.delete(id);
  }

  async searchUsers(dto: SearchAttributesDto) {
    const search = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value));
    return await this.userRepository.find({
      where: { ...search }
    });
  }
}
