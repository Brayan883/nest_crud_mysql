import { Injectable } from "@nestjs/common";
import { CreateProductoDto } from "./dto/create-producto.dto";
import { UpdateProductoDto } from "./dto/update-producto.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Producto } from "./entities/producto.entity";

import { HttpException, HttpStatus } from "@nestjs/common";
import { Categoria } from "../categorias/entities/categoria.entity";
import { UserActivateInterface } from "../common/interfaces/user-activate.interface";
import { Role } from "../common/enums/role.enum";

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,

    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(
    createProductoDto: CreateProductoDto,
    user: UserActivateInterface,
  ) {    
    const categoria = await this.validateProducto(createProductoDto.categoria);
    const newProducto = this.productoRepository.create({
      ...createProductoDto,
      categoria,
      user_Email: user.email,
    });

    return await this.productoRepository.save(newProducto);
  }

  async findAll(user: UserActivateInterface) {
    if (user.role === Role.ADMIN) {
      return await this.productoRepository.find();
    }
    return await this.productoRepository.find({
      where: { user_Email: user.email },
    });
  }

  async findOne(id: number, user: UserActivateInterface) {
    const producto = await this.productoRepository.findOneBy({
      id,
    });
    if (!producto) {
      throw new HttpException("El producto no existe", HttpStatus.NOT_FOUND);
    }    
    this.validateOwnership(producto, user);
    return producto;
  }

  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
    user: UserActivateInterface,
  ) {
    const producto = await this.findOne(id, user);
    return this.productoRepository.update(
      { id: producto.id },
      {
        ...updateProductoDto,
        categoria: updateProductoDto.categoria
          ? await this.validateProducto(updateProductoDto.categoria)
          : undefined,
        user_Email: user.email,
      },
    );
  }

  async remove(id: number, user: UserActivateInterface) {
    const producto = await this.findOne(id, user);
    return this.productoRepository.softDelete({ id: producto.id });
  }

  private validateOwnership(producto: Producto, user: UserActivateInterface) {  
    if (producto.user_Email !== user.email && user.role !== Role.ADMIN) {
      throw new HttpException("Acceso denegado", HttpStatus.FORBIDDEN);
    }
  }

  private async validateProducto(producto: string): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({
      nombre: producto,
    });    

    if (!categoria) {
      throw new HttpException("La categoria no existe", HttpStatus.NOT_FOUND);
    }

    return categoria;
  }
}
