import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-user.dto';
export declare class AuthService {
    private readonly prismaService;
    private jwtService;
    private readonly userService;
    constructor(prismaService: PrismaService, jwtService: JwtService, userService: UsersService);
    login(loginDTO: LoginDTO): Promise<any>;
}
