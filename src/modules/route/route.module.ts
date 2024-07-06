import { Module } from "@nestjs/common";
import { RouteService } from "./route.service";
import { RouteController } from "./route.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Route } from "./entities/route.entity";
import { RoleModule } from "../role/role.module";
import { PermissionModule } from "../permission/permission.module";

@Module({
  controllers: [RouteController],
  providers: [RouteService],
  imports: [TypeOrmModule.forFeature([Route]), RoleModule, PermissionModule],
})
export class RolePermissionRouteModule {}
