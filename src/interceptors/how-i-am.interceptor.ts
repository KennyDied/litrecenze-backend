import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class HowIAmInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const reqHeader = req.headers.authorization;
    console.log(reqHeader);
    return next.handle();
  }

}
