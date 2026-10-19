import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { PrismaService } from '@/prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: RegisterDto) {
    const hashedPassword = await hash(data.password, 12);

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
}