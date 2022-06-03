import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../../decorators/roles.decorator';
import { FORBIDDEN } from '../auth.error';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }

      const reqHeader = req.headers.authorization;
      const bearer = reqHeader.split(' ')[0];
      const token = reqHeader.split(' ')[1];

      if (bearer !== 'Bearer' && !token) return false;
      const user = this.jwtService.verify(token);
      req.user = user
      const result = user.roles.some(role => {
        return requiredRoles.includes(role.value)
      });
      return result
    } catch (e) {
      throw new HttpException(FORBIDDEN, HttpStatus.FORBIDDEN);
    }
  }
}
