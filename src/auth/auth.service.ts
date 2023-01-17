import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Jwt, Msg } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * ユーザ登録
   *
   * @param dto
   * @returns Msg
   */
  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
        },
      });
      return {
        message: 'OK',
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        // @see https://www.prisma.io/docs/reference/api-reference/error-reference
        if (e.code === 'P2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }
      throw e;
    }
  }

  /**
   * ログイン
   *
   * @param dto
   * @returns Jwt
   */
  async login(dto: AuthDto): Promise<Jwt> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Email or Password is incorrect');

    // 入力されたパスワードと登録済みのパスワードの比較
    const isValid = bcrypt.compare(dto.password, user.hashedPassword);

    if (!isValid)
      throw new ForbiddenException('Email or Password is incorrect');

    return await this.generateJwt(user.id, user.email);
  }

  /**
   * トークン生成
   *
   * @param dto
   * @returns Jwt
   */
  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret: secret,
    });
    return {
      accessToken: token,
    };
  }
}
