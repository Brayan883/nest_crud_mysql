import { Module } from "@nestjs/common";
import { CategoriasService } from "./categorias.service";
import { CategoriasController } from "./categorias.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { JwtService } from "@nestjs/jwt";
// import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriasController],
  providers: [CategoriasService, JwtService],
  exports: [TypeOrmModule],
})
export class CategoriasModule {}
