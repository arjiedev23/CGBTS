import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDTO } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req() request: Request,
    @Req() response: Response,
    @Body() loginDTO: LoginDTO,
  ): Promise<any> {
    try {
      const result = await this.authService.login(loginDTO);
      return {
        respCode: '1',
        respMessage: 'Successfully login!',
        res: result,
      };
    } catch (err) {
      return {
        respCode: '0',
        respMessage: err.message,
      };
    }
  }
}
