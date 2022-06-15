import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/entities/repositories/user.repository';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(login_id: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { login_id } });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  /**
   * ログイン
   */
  async login(user: User) {
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);
    return {
      ...tokens,
    };
  }

  /**
   * トークンリフレッシュ
   */
  async refreshToken(user: User, authorization: string) {
    const refreshToken = authorization.replace('Bearer', '').trim();

    if (!bcrypt.compareSync(refreshToken, user.refreshToken)) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user, tokens.refresh_token);

    return {
      ...tokens,
    };
  }

  /**
   * トークン作成
   */
  private async getTokens(user: User) {
    const payload = { login_id: user.login_id, sub: user.id };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.accessTokenSecret,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: jwtConstants.refreshTokenSecret,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  /**
   * リフレッシュトークン更新
   */
  private async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
    const payload = {
      refreshToken: hashedRefreshToken,
    };
    await this.userRepository.update(user.id, payload);
  }
}
