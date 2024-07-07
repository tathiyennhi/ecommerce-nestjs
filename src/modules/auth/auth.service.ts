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
import { AdminService } from "../admin/admin.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private adminService: AdminService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (user && user.password === Utils.md5Hash(password)) {
      return user.data;
    }
    return null;
  }

  async signIn(dto: LoginDto) {
    const payload = { username: dto.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: "jwtConstants.secret",
      }),
    };
  }

  async checkAdminLogin(email: string, password: string) {
    try {
      const res = await this.adminService.check(email, Utils.md5Hash(password));
      if (!res.data) {
        return new Result(
          Status.ERROR,
          null,
          res?.message || "Admin not found",
        );
      }
      const token = await this.jwtService.signAsync(
        { email: res.data.email },
        {
          secret: process.env.TOKEN_KEY,
        },
      );
      return new Result(Status.SUCCESS, token, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        "Something error, please check again!",
      );
    }
  }

  async extractToken(token: string) {
    try {
      const decodedToken = this.jwtService.verify(token);
      const email = decodedToken.email;
      return new Result(Status.SUCCESS, { email }, null);
    } catch (error) {
      return new Result(
        Status.ERROR,
        null,
        error?.message || "extract token fail",
      );
    }
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
