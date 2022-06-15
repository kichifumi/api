import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/entities/repositories/user.repository';
import { jwtConstants } from '../constants';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshTokenSecret,
    });
  }

  async validate(payload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { login_id: payload.login_id },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
