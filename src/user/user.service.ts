import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ユーザ更新
   *
   * @see https://typescriptbook.jp/reference/type-reuse/utility-types/omit
   * @param userId
   * @param dto
   * @returns UserからhashedPasswordを除いたもの
   */
  async updateUser(
    userId: number,
    form: UpdateUserDto,
  ): Promise<Omit<User, 'hashedPassword'>> {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { ...form },
    });
    delete user.hashedPassword;
    return user;
  }
}
