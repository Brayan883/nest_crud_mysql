import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsString()
  nombre: string;
}
