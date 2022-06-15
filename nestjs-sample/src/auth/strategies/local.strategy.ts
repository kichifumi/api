import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login_id',
      passwordField: 'password',
    });
  }

  async validate(login_id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(login_id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
