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

import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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
@ApiTags("users")
@Auth(Role.ADMIN)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse({
    description: "The record has been successfully created.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiOkResponse({ description: "The record has been successfully listed." })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiOkResponse({ description: "The record has been successfully listed." })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiOkResponse({ description: "The record has been successfully updated." })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiNotFoundResponse({ description: "User not found" })
  @ApiOkResponse({ description: "The record has been successfully deleted." })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
