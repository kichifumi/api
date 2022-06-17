import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/entities/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: Repository<UserRepository>,
  ) {}

  async getUserList(): Promise<UserRepository[]> {
    return await this.userRepository.find();
  }

  async getUser(id: number): Promise<UserRepository> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(userDTO): Promise<InsertResult> {
    const user = new User();
    user.username = userDTO.username;
    user.password = userDTO.password;
    return await this.userRepository.insert(userDTO);
  }

  async updateUser(id: number, User): Promise<UpdateResult> {
    return await this.userRepository.update(id, User);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
