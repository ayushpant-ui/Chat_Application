import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '@/prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';
import {LoginDto} from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly jwtService: JwtService) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    try {
      await this.prisma.user.create({
        data: {
          email: data.email,
          username: data.username,
          password: hashedPassword,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException('Email or username already in use');
      }
      throw e;
    }

    return { message: 'Account created' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const isValid = user && (await bcrypt.compare(dto.password, user.password));
    if (!user || !isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    };
  }
}
