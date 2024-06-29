import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

import { HttpException, HttpStatus } from "@nestjs/common";

import * as bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { UserActivateInterface } from "../common/interfaces/user-activate.interface";
import { Response } from "express";

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

  async login(loginDto: LoginDto, res: Response) {
    const user = await this.usersService.findOneEmailPassword(loginDto.email);
    if (!user) {
      throw new HttpException("Email not found", HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new HttpException("Wrong password", HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, role: user.role };
    const { access_token, expiresIn } = await this.GenerateToken(payload);
    await this.RefleshToken(payload, res);

    return res.status(200).json({
      access_token,
      email: user.email,
      expiresIn,
    });
  }

  async profile(req: { email: string; role: string }) {
    return await this.usersService.findOneEmail(req.email);
  }

  async registerRefresh(payload: UserActivateInterface) {
    try {
      const { access_token, expiresIn } = await this.GenerateToken(payload);
      return { access_token, expiresIn };
    } catch (error) {
      throw new HttpException(
        "error generating token",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async logout(res: Response) {
    res.clearCookie("refresh_token");
    res.status(200).send({ message: "Succesfully logged out" });
  }

  private async GenerateToken(payload: UserActivateInterface): Promise<{
    access_token: string;
    expiresIn: number;
  }> {
    const expiresIn = 60 * 15;
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn,
        secret: process.env.JWT_SECRET,
      });
      return { access_token: token, expiresIn };
    } catch (error) {
      throw new HttpException(
        "Error generating token",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async RefleshToken(payload: UserActivateInterface, res: Response) {
    const expiresIn = 60 * 60 * 24;
    try {
      const token = await this.jwtService.signAsync(payload, {
        expiresIn,
        secret: process.env.JWT_REFRESH_SECRET,
      });

      res.cookie("refresh_token", token, {
        httpOnly: true,
        secure: !(process.env.MODO === "development"),
        expires: new Date(Date.now() + expiresIn * 1000),
      });
    } catch (error) {
      throw new HttpException(
        "Error refleshing token",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
