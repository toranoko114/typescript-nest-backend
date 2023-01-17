import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateUser(userId: number, form: UpdateUserDto): Promise<Omit<User, 'hashedPassword'>>;
}
