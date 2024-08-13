import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (!user.role || user.role.length === 0) {
      throw new UnauthorizedException('El usuario no tiene roles asignados');
    }

    const hasRole = roles.some((role) => user.role.includes(role));

    if (!hasRole) {
      throw new UnauthorizedException('No tienes permiso para acceder a este recurso');
    }

    console.log(`Usuario ${user.email} con role ${user.role.join(', ')} accedió a un recurso protegido`);

    return true;
  }
}