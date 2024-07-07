import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../user/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.stretagy";
import { GoogleStrategy } from "./google.strategy";
import { AdminModule } from "../admin/admin.module";

@Global()
@Module({
  imports: [
    // UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_KEY, //"jwtConstants.secret",
      signOptions: { expiresIn: "28800s" },
    }),
    UsersModule,
    AdminModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
