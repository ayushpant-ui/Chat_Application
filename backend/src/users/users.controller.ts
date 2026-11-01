import { Controller } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Post,Body,Patch,Req } from '@nestjs/common';
import { PasswordDTO } from './dto/users.dto.js';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Patch('change-password')
    async changepassword(
         @Req() req:{user:{sub:string}},
         @Body() data:PasswordDTO,
    ){
    const id = req.user.sub;
    return this.usersService.updatePassword(id,data)
    }
}
