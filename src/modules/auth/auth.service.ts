import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login({ username, id }) {
    const payload = { username, id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
