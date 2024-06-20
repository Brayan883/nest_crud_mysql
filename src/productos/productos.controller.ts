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

@Auth(Role.USER)
@Controller("productos")
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post()
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.create(createProductoDto, user);
  }

  @Get()
  async findAll(@ActivateUser() user: UserActivateInterface) {
    return await this.productosService.findAll(user);
  }

  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.findOne(id, user);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.update(id, updateProductoDto, user);
  }

  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @ActivateUser() user: UserActivateInterface,
  ) {
    return await this.productosService.remove(id, user);
  }
}
