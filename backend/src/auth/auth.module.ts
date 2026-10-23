import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service.js';

@Module({
  imports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService,PrismaService]
})
export class AuthModule {}
