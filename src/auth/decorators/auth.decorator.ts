import { UseGuards, applyDecorators } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";
import { CookieAuthGuard } from "../guard/cookie-auth.guard";
export function Auth(role: Role) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard, CookieAuthGuard, RolesGuard),
  );
}
