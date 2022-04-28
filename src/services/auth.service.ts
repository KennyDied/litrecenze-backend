import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/auth/register.dto';
import { PASSWORD_NOT_CORRECT, USER_ALREADY_REGISTERED, USER_NOT_REGISTERED } from '../errors/auth.error';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user = await this.usersService.getUserByEmail(email);
    if (!user) throw new HttpException(USER_NOT_REGISTERED, HttpStatus.BAD_REQUEST);
    user = await this.usersService.getUserById(user.id);

    const passIsCorrect = await compare(password, user.passwordHash);
    if (passIsCorrect) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: RegisterDto) {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (user) throw new HttpException(USER_ALREADY_REGISTERED, HttpStatus.BAD_REQUEST);

    const { password, ...other } = dto;
    const passwordHash = await hash(password, 10);
    return await this.usersService.createUser({ ...other, passwordHash });
  }

  async login({ email, password }) {
    const result = await this.validateUser(email, password);
    if (!result) throw new HttpException(PASSWORD_NOT_CORRECT, 401);

    const payload = {
      email: result.email,
      roles: result.roles,
    };

    return { access_token: this.jwtService.sign(payload)};
  }

  async recovery(email: string) {
    return 'To be continue...'
  }

}