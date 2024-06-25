import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmailUnique(createUserDto.email);
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return {
      name: newUser.name,
      email: newUser.email,
    };
  }

  async findOneEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async findOneEmailPassword(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: ["id", "name", "email", "password", "role"],
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.validateEmailUnique(user.email);
    return await this.usersRepository.update({ id: user.id }, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.softDelete({ id: user.id });
  }

  private async validateEmailUnique(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
    }
  }
}
