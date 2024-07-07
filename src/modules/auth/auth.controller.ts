import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminLoginDto, LoginDto } from "./dto/login-dto";
import { LocalAuthGuard } from "./local-auth.guard";
import { GoogleAuthGuard } from "./google-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Body() dto: LoginDto) {
    return this.authService.signIn(dto);
  }

  @Post("/admin-login")
  async adminLogin(@Body() dto: AdminLoginDto) {
    return await this.authService.checkAdminLogin(dto.email, dto.password);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.authService.remove(+id);
  // }
}
