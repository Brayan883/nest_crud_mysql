import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";
import { Role } from "../../common/enums/role.enum";

export class CreateUserDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value.trim())
  @IsString()  
  @MinLength(3)
  name?: string;

  @Transform(({ value }) => value.trim())
  @IsString()  
  @MinLength(3)
  role?: Role;
}
