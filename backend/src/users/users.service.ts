import { PrismaService } from '@/prisma/prisma.service.js';
import { Injectable, NotFoundException,ConflictException,UnauthorizedException } from '@nestjs/common';
import { PasswordDTO, ProfileDTO, UsernameDTO } from './dto/users.dto.js';
import { Prisma } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async updatePassword(userId: string, data: PasswordDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    const checkpassword = await bcrypt.compare(
      data.currentPassword,
      user.password,
    );

    if (!checkpassword) {
      throw new UnauthorizedException('Password did not match');
    }

    const hashpass = await bcrypt.hash(data.newPassword,12);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashpass,
      },
    });

    return {
      message: 'Successfully Password Changed',
    };
  }
  async updateImage(userid:string ,data: ProfileDTO) {

    const user = await this.prisma.user.findUnique({
        where:{
            id:userid
        }
    })

    if (!user){
        throw new NotFoundException('User Not Found')
    }

    const updateduser = await this.prisma.user.update(
        {
            where:{
                id:userid
            },
            data:{
                avatarUrl:data.avatarUrl
            },
            select:{
                avatarUrl:true
            }
        }
    )
    return {
        message:'Profile Image Updated Successfully',
        updateduser
    }
  }

  async updateUsername(userid: string, data: UsernameDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    if (!user) {
      throw new NotFoundException('Not Found');
    }
    let updateduser ;
    try {
       updateduser = await this.prisma.user.update({
        where: {
          id: userid,
        },
        data: {
          username: data.username,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }

    return {
      message: 'Username Updated Successfully',
      user: updateduser,
    };
  }
}
