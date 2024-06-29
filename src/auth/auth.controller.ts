import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { Role } from "../common/enums/role.enum";
import { Auth } from "./decorators/auth.decorator";

import { ActivateUser } from "../common/decorator/activate-user.decorator";

import { UserActivateInterface } from "../common/interfaces/user-activate.interface";

import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Response } from "express";

@ApiUnauthorizedResponse({
  description: "Unauthorized Bearer Auth",
})
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @Auth(Role.ADMIN)
  @Post("register")
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ description: "User not found" })
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  @ApiNotFoundResponse({ description: "User not found" })
  @Post("login")
  login(
    @Body()
    loginDto: LoginDto,
    @Res() res: Response,
  ) {
    return this.authService.login(loginDto, res);
  }

  @ApiBearerAuth()  
  @ApiOkResponse({
    description: "The record has been successfully generated a new token.",
  })
  @Auth(Role.USER)
  @Post("refleshToken")
  async refleshToken(@ActivateUser() user: UserActivateInterface) {
    return this.authService.registerRefresh(user);
  }

  @ApiBearerAuth()  
  @ApiOkResponse({
    description: "The record has been successfully exit.",
  })
  @Auth(Role.USER)
  @Post("logout")
  async logout(@Res() res: Response) {
    this.authService.logout(res);
  }

  @ApiBearerAuth()
  @Get("profile")
  @Auth(Role.ADMIN)
  @ApiOkResponse({
    description: "The record has been successfully listed.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ description: "User not found" })
  async profile(@ActivateUser() user: UserActivateInterface) {
    return this.authService.profile(user);
  }
}
