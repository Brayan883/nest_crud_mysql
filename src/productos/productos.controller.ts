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

import { ProductosService } from "./productos.service";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";

import { Auth } from "../auth/decorators/auth.decorator";
import { Role } from "../common/enums/role.enum";

import { ActivateUser } from "../common/decorator/activate-user.decorator";
import { UserActivateInterface } from "../common/interfaces/user-activate.interface";

import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: "Unauthorized Bearer Auth",
})
@ApiTags("productos")
@Auth(Role.USER)
@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiOkResponse({ description: "The record has been successfully created." })
  @Post()
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.create(createProductoDto, user);
  }

  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiOkResponse({ description: "The record has been successfully listed." })
  @Get()
  async findAll(@ActivateUser() user: UserActivateInterface) {
    return await this.productosService.findAll(user);
  }

  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.findOne(id, user);
  }

  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiOkResponse({ description: "The record has been successfully updated." })
  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.update(id, updateProductoDto, user);
  }

  @ApiNotFoundResponse({ description: "The record was not found." })
  @ApiForbiddenResponse({ description: "Forbidden." })
  @ApiOkResponse({ description: "The record has been successfully removed." })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.remove(id, user);
  }
}
