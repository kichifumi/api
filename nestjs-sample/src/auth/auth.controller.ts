import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  async regenerateTokens(@Request() req) {
    return this.authService.refreshToken(req.user, req.headers.authorization);
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  async tokenCheck() {
    return true;
  }
}
