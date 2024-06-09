import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login-dto';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {

  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  // auth(dto: LoginDto) {
  //   // get data user from db
  //   const userName = "admin";
  //   const pass = '123456'; // hashed
  //   if (dto.name === userName && dto.password === pass) {
  //     return "token-bearer";
  //   } else {
  //     return false;
  //   }
  // }

  async signIn(dto: LoginDto) {
    // get user by dto.username
    // const user = {
    //   username: "admin",
    //   password: "123456"
    // }

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // @TODO: remove after using
    // const md5Hash = crypto.createHash('md5').update(user.password).digest('hex');
    // user.password = md5Hash;
    // end TODO

    //use md5 algorithm
    // const isPasswordValid = this.compareMD5Hash(dto.password, user.password);
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }

    const payload = { username: dto.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: "jwtConstants.secret",
      }),
    };
  }
  compareMD5Hash(password: string, hashedPassword: string): boolean {
    const md5Hash = crypto.createHash('md5').update(password).digest('hex');
    return md5Hash === hashedPassword;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
