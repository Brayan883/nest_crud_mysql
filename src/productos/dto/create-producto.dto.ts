import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, IsString, Max } from "class-validator";

export class CreateProductoDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  precio: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Max(100)
  stock: number;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  categoria: string;
}
