import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

import { HttpException, HttpStatus } from "@nestjs/common";

import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.findOneEmail(registerDto.email);
    if (user) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
    return await this.usersService.create({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, 10),
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneEmailPassword(loginDto.email);
    if (!user) {
      throw new HttpException("Email not found", HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      email: user.email,
    };
  }

  async profile(req: { email: string; role: string }) {
    return await this.usersService.findOneEmail(req.email);
  }
}
