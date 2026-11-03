import { Controller,UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { Post,Body,Patch,Req } from '@nestjs/common';
import { PasswordDTO, ProfileDTO, UsernameDTO } from './dto/users.dto.js';
import { AuthGuard } from './roles.guard.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly usersService:UsersService){}

    @Patch('change-password')
    async changePassword(
         @Req() req:{user:{sub:string}},
         @Body() data:PasswordDTO,
    ){
    const id = req.user.sub;
    return this.usersService.updatePassword(id,data)
    }

    @Patch('change-username')
    async changeUsername(
    @Req() req:{user:{sub:string}},
    @Body() data:UsernameDTO)
    {
        const id = req.user.sub;
        return await this.usersService.updateUsername(id,data);
    }

    @Patch('change-profile')
    async changeProfile(@Req() req:{user:{
        sub:string
    }},@Body() data:ProfileDTO){
        const id = req.user.sub;
        return this.usersService.updateImage(id,data)
    }
}
