import { Controller, Req } from '@nestjs/common';
import {AuthService} from './auth.service.js';
import { Post,Body,Patch } from '@nestjs/common';
import {RegisterDto} from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { PasswordDTO } from '@/users/dto/users.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly registerService: AuthService) {}

    @Post('register') 
    async register(@Body() data:RegisterDto) {
    return await this.registerService.register(data);
    }

    @Post('login')
    async login(@Body() data:LoginDto){
    return this.registerService.login(data);
    }


}
