import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';

@Injectable()
export class UserauthService {
  constructor(private jwtService: JwtService) {}

  async generateJwt(user: User) {
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
      },
      {
        secret: jwtConstants.secret,
        expiresIn: '1d',
      },
    );

    return token;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword;
  }

  async comparePasswords(password: string, storedPassword: string) {
    return await bcrypt.compare(password, storedPassword);
  }
}
