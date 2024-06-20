import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateCategoriaDto } from "./dto/create-categoria.dto";
import { UpdateCategoriaDto } from "./dto/update-categoria.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "./entities/categoria.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    await this.validateCategoria(createCategoriaDto.nombre);
    const categoria = this.categoriasRepository.create(createCategoriaDto);
    return await this.categoriasRepository.save(categoria);
  }

  async findAll() {
    return await this.categoriasRepository.find();
  }

  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOneBy({ id });
    if (!categoria) {
      throw new HttpException("La categoria no existe", HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    await this.validateCategoria(categoria.nombre);
    return await this.categoriasRepository.update(
      { id: categoria.id },
      updateCategoriaDto,
    );
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    return await this.categoriasRepository.softDelete({ id: categoria.id });
  }

  private async validateCategoria(categoria: string) {
    const categoriaEncontrada = await this.categoriasRepository.findOneBy({
      nombre: categoria,
    });

    if (categoriaEncontrada) {
      throw new HttpException("La categoria ya existe", HttpStatus.BAD_REQUEST);
    }
  }
}
