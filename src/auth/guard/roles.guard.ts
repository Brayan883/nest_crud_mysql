import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles_Key } from "../decorators/roles.decorator";
import { Role } from "../../common/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly refleactor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const role = this.refleactor.getAllAndOverride<Role>(Roles_Key, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();


    if (user.role === Role.ADMIN) {
      return true;
    }

    return role === user.role;
  }
}
