import { Controller } from '@nestjs/common';
import {AuthService} from './auth.service.js';
import { Post,Body } from '@nestjs/common';
import {RegisterDto} from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly registerService: AuthService) {}

    @Post('register') 
    async register(@Body() data:RegisterDto) {
    return await this.registerService.register(data);
    }
}
