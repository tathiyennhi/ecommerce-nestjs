/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { LoginDto } from "./dto/login-dto";

import { JwtService } from "@nestjs/jwt";
// import * as bcrypt from 'bcryptjs';
// import * as crypto from 'crypto';
import { UsersService } from "../user/users.service";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";
import { Utils } from "src/common/utils/utils";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && user.password === Utils.md5Hash(password)) {
      return user.data;
    }
    return null;
  }

  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return "This action adds a new auth";
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
  // compareMD5Hash(password: string, hashedPassword: string): boolean {
  //   const md5Hash = crypto.createHash('md5').update(password).digest('hex');
  //   return md5Hash === hashedPassword;
  // }

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

  async googleLogin(req) {
    try {
      if (!req.user) {
        return new Result(Status.ERROR, null, "No user from google");
      }

      // check user existed in db yet?
      const foundUser = await this.usersService.findByEmail(req.user.email);

      // not exist -> store to db, information, create jwt, continue shoping
      if (!foundUser.data) {
        const createUserDto: CreateUserDto = {
          email: req.user.email,
          name: req.user.lastName || req.user.email,
          createVia: "google-login",
          password: null,
          picture: req.user?.picture,
        };
        const newUser = await this.usersService.create(createUserDto);
        if (!newUser.data) {
          // @TODO: logger error here, but continue shopping
        }
      }

      // exited ==> gen jwt
      // const {email, firstname, lastname, picture} = req.user;
      // const payload = { email, firstname, lastname, picture };
      const token = await this.jwtService.signAsync(req.user, {
        secret: process.env.TOKEN_KEY,
      });
      return new Result(Status.SUCCESS, token, null);
    } catch (error) {
      return new Result(
        Status.SUCCESS,
        null,
        error?.message || "googleLogin Error",
      );
    }
  }
}
