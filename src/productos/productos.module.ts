import { Module } from "@nestjs/common";
import { ProductosService } from "./productos.service";
import { ProductosController } from "./productos.controller";

import { TypeOrmModule } from "@nestjs/typeorm";
import { Producto } from "./entities/producto.entity";
import { CategoriasModule } from "src/categorias/categorias.module";
import { CategoriasService } from "src/categorias/categorias.service";

@Module({
  imports: [TypeOrmModule.forFeature([Producto]), CategoriasModule],
  controllers: [ProductosController],
  providers: [ProductosService, CategoriasService],
})
export class ProductosModule {}
