import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/csrf')
  getCsrfToken(@Req() req: Request): Csrf {
    return { csrfToken: req.csrfToken() };
  }

  /**
   * ユーザ登録のエンドポイント
   * @param form
   * @returns Msg
   */
  @Post('signup')
  public signUp(@Body() form: AuthDto): Promise<Msg> {
    return this.authService.signUp(form);
  }

  /**
   * ログインのエンドポイント
   * @see https://docs.nestjs.com/controllers
   *
   * @param form
   * @param res
   * @returns Msg
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(
    @Body() form: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(form);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'OK',
    };
  }

  /**
   * ログアウトのエンドポイント
   *
   * @param req
   * @param res
   * @returns Msg
   */
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    return {
      message: 'OK',
    };
  }
}
