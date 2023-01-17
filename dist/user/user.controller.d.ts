import { User } from '@prisma/client';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getLoginUser(req: Request): Omit<User, 'hashedPassword'>;
    updateUser(req: Request, form: UpdateUserDto): Promise<Omit<User, 'hashedPassword'>>;
}
