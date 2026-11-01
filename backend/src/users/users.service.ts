import { PrismaService } from '@/prisma/prisma.service.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordDTO, ProfileDTO, UsernameDTO } from './dto/users.dto.js';

import * as bcrypt from 'bcrypt'



@Injectable()
export class UsersService {

constructor(private readonly prisma:PrismaService){}


async updatePassword(userId:string  , data:PasswordDTO){
const user = await this.prisma.user.findUnique({
    where : {
        id : userId
    }
})

if(!user){
    throw new NotFoundException('User Not Found')
}

const checkpassword = await bcrypt.compare(data.currentpassword,user.password);

if(!checkpassword){
    throw new NotFoundException('Password did not match' );
}

  await this.prisma.user.update({
    where:{
        id: userId
    },
    data:{
        password : data.currentpassword
    }
})

return({
    message : 'Successfully Password Changed'
})

}
async updateImage(data:ProfileDTO){

}

async updateUsername(data:UsernameDTO){

}
}
