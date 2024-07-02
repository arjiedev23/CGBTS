import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<any> {
    const { username, password } = loginDTO;
    const users = await this.prismaService.users.findUnique({
      where: { username: username },
    });

    if (!users) {
      throw new NotFoundException('Invalid username and password!');
    }

    if (users.password != password) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ username }),
    };
  }
}
