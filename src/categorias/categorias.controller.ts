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

import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: "Unauthorized Bearer Auth",
})
@ApiTags("Categorias")
@Auth(Role.ADMIN)
@Controller("categorias")
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriasService.create(createCategoriaDto);
  }

  @ApiOkResponse({ description: "The records have been successfully listed." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Get()
  async findAll() {
    return await this.categoriasService.findAll();
  }

  @ApiOkResponse({ description: "The record has been successfully found." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return await this.categoriasService.findOne(id);
  }

  @ApiOkResponse({ description: "The record has been successfully updated." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return await this.categoriasService.update(id, updateCategoriaDto);
  }

  @ApiOkResponse({ description: "The record has been successfully removed." })
  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return await this.categoriasService.remove(id);
  }
}
