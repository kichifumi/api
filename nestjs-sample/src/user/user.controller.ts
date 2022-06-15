import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserUserList() {
    return await this.service.getUserList();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.service.getUser(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addUser(@Body() createUserDTO: UserDTO): Promise<InsertResult> {
    return await this.service.createUser(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUsertDTO: UserDTO,
  ): Promise<UpdateResult> {
    return await this.service.updateUser(Number(id), updateUsertDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return await this.service.deleteUser(Number(id));
  }
}
