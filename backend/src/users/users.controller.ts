import { Controller } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Post,Body,Patch,Req } from '@nestjs/common';
import { PasswordDTO, UsernameDTO } from './dto/users.dto.js';

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

    @Patch('change-username')
    async changeusername(
    @Req() req:{user:{sub:string}},
    @Body() data:UsernameDTO)
    {
        const id = req.user.sub;
        return await this.usersService.updateUsername(id,data);
    }
}
