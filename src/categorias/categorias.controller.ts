import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { CategoriasService } from "./categorias.service";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { Role } from "../common/enums/role.enum";

@Auth(Role.ADMIN)
@Controller("categorias")
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  async findAll() {
    return await this.categoriasService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.categoriasService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return await this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.categoriasService.remove(id);
  }
}
