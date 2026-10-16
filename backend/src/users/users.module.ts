import { Module } from '@nestjs/common';
import { ControllerService } from './controller/controller.service.js';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
  providers: [ControllerService, UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
