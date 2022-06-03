import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NOT_AUTHORIZED } from '../auth.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const reqHeader = req.headers.authorization;
      const bearer = reqHeader.split(' ')[0];
      const token = reqHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token) throw new UnauthorizedException({ message: NOT_AUTHORIZED });

      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: NOT_AUTHORIZED });
    }
  }
}