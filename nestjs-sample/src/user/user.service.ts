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
    user.login_id = userDTO.login_id;
    user.password = userDTO.password;
    user.first_name = userDTO.first_name;
    user.last_name = userDTO.last_name;
    user.first_name_kana = userDTO.first_name_kana;
    user.last_name_kana = userDTO.last_name_kana;
    user.admin_flag = userDTO.admin_flag;
    return await this.userRepository.insert(userDTO);
  }

  async updateUser(id: number, User): Promise<UpdateResult> {
    return await this.userRepository.update(id, User);
  }

  async deleteUser(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
