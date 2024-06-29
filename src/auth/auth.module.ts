import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtService } from "@nestjs/jwt";
// import { jwtConstants } from "./constants/jwt.constants";
// import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>("JWT_SECRET"),
    //     signOptions: { expiresIn: "1d" },
    //     global: true,
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  // exports: [JwtModule],
})
export class AuthModule {}
