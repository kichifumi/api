import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import { UserRepository } from 'src/entities/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(login_id: string, password: string): Promise<any> {
    // const user = await this.userService.findOne(login_id);
    const user = await this.userRepository.findOne({ where: { login_id } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    // ↓↓↓ bcryptを使わない場合
    // if (user && user.password === password) {
    //   const { password, ...result } = user;
    //   return result;
    // }

    return null;
  }

  async login(user: any) {
    const payload = { login_id: user.login_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
