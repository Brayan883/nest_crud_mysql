import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Request } from "express";
import { Role } from "../common/enums/role.enum";
import { Auth } from "./decorators/auth.decorator";

import { ActivateUser } from "../common/decorator/activate-user.decorator";

import { UserActivateInterface } from "../common/interfaces/user-activate.interface";
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Auth(Role.ADMIN)
  @Post("register")
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post("login")
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @Get("profile")
  @Auth(Role.USER)
  async profile(@ActivateUser() user: UserActivateInterface) {
    return this.authService.profile(user);
  }
}
