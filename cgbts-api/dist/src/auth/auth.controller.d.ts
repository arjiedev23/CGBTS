import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDTO } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(request: Request, response: Response, loginDTO: LoginDTO): Promise<any>;
}
