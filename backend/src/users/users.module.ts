import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';
import { PrismaService } from '@/prisma/prisma.service.js';
import { AuthGuard } from './auth.guard.js';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/prisma/prisma.module.js';
import { AuthModule } from '@/auth/auth.module.js';

@Module({
  imports:[AuthModule,PrismaModule],
  providers: [ UsersService,PrismaService,AuthGuard],
  controllers: [UsersController]
})
export class UsersModule {}
