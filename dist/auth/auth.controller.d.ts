import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getCsrfToken(req: Request): Csrf;
    signUp(form: AuthDto): Promise<Msg>;
    login(form: AuthDto, res: Response): Promise<Msg>;
    logout(req: Request, res: Response): Promise<Msg>;
}
