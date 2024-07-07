import { Injectable } from "@nestjs/common";
import { CreateRouteDto } from "./dto/create-route.dto";
import { Route } from "./entities/route.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Result } from "src/common/service-result/result";
import { Status } from "src/common/enums/service-status-code.enum";
import { PermissionService } from "../permission/permission.service";
import { RoleService } from "../role/role.service";

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private repository: Repository<Route>,
    private permissionService: PermissionService,
    private roleService: RoleService,
  ) {}

  async create(createRoute: CreateRouteDto) {
    try {
      const neww = this.repository.create({
        name: createRoute.name,
        route: createRoute.route,
      });

      await this.repository.save(neww);
      return new Result(Status.SUCCESS, "Route rule created", null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }
  async addPermisisonsForRoute(routeId: string, permissionId: string) {
    try {
      const foundRoute = await this.repository.findOne({
        where: { id: routeId },
      });
      if (!foundRoute) {
        return new Result(Status.ERROR, null, "Route rule not found");
      }

      const foundPermission =
        await this.permissionService.findOne(permissionId);
      if (!foundPermission.data) {
        return new Result(Status.ERROR, null, "Permission not found");
      }
      const existingPermissions = foundRoute.permissions;
      // if (existingPermissions.includes(foundPermission.data)) {
      for (const permission of existingPermissions) {
        if (permission.id === permissionId) {
          return new Result(
            Status.SUCCESS,
            "Add permission successfully",
            null,
          );
        }
      }
      // return new Result(Status.SUCCESS, "Add permission successfully", null);
      // }
      existingPermissions.push(foundPermission.data);
      // foundRoute.permissions = existingPermissions;

      await this.repository.save(foundRoute);
      return new Result(
        Status.SUCCESS,
        "Add permission for route successfully",
        null,
      );
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }
  async addRoleForRoute(routeId: string, roleId: string) {
    try {
      const foundRoute = await this.repository.findOne({
        where: { id: routeId },
      });
      if (!foundRoute) {
        return new Result(Status.ERROR, null, "Route rule not found");
      }

      const foundRole = await this.roleService.findOne(roleId);
      if (!foundRole.data) {
        return new Result(Status.ERROR, null, "Permission not found");
      }
      const existingRoles = foundRoute.permissions;
      // if (existingPermissions.includes(foundRole.data)) {
      for (const role of existingRoles) {
        if (role.id === roleId) {
          return new Result(
            Status.SUCCESS,
            "Add role for route successfully",
            null,
          );
        }
      }
      // return new Result(Status.SUCCESS, "Add permission successfully", null);
      // }
      existingRoles.push(foundRole.data);
      // foundRoute.permissions = existingPermissions;

      await this.repository.save(foundRoute);
      return new Result(
        Status.SUCCESS,
        "Add permission for route successfully",
        null,
      );
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }
  async removePermisisonsFromRoute(routeId: string, permissionId: string) {
    try {
      const foundRoute = await this.repository.findOne({
        where: { id: routeId },
      });
      if (!foundRoute) {
        return new Result(Status.ERROR, null, "Route rule not found");
      }

      const foundPermission =
        await this.permissionService.findOne(permissionId);
      if (!foundPermission.data) {
        return new Result(Status.ERROR, null, "Permission not found");
      }
      foundRoute.permissions = foundRoute.permissions.filter(
        (p) => p.id !== permissionId,
      );

      await this.repository.save(foundRoute);
      return new Result(
        Status.SUCCESS,
        "Add permission for route successfully",
        null,
      );
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }
  async removeRoleFromRoute(routeId: string, roleId: string) {
    try {
      const foundRoute = await this.repository.findOne({
        where: { id: routeId },
      });
      if (!foundRoute) {
        return new Result(Status.ERROR, null, "Route rule not found");
      }

      const foundPermission = await this.roleService.findOne(roleId);
      if (!foundPermission.data) {
        return new Result(Status.ERROR, null, "Permission not found");
      }

      foundRoute.roles = foundRoute.roles.filter((p) => p.id !== roleId);

      await this.repository.save(foundRoute);
      return new Result(
        Status.SUCCESS,
        "Add permission for route successfully",
        null,
      );
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  findAll() {
    return `This action returns all rolePermissionRoute`;
  }

  async findOne(id: string) {
    try {
      const found = await this.repository.findOne({
        where: { id },
      });
      if (!found) {
        return new Result(Status.ERROR, null, "Route not found");
      }
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }
  async findByRouteName(route: string, method: string) {
    try {
      const found = await this.repository.findOne({
        where: { route, method },
        relations: ["roles", "permissions"],
      });
      if (!found) {
        return new Result(Status.ERROR, null, "Route not found");
      }
      return new Result(Status.SUCCESS, found, null);
    } catch (error) {
      return new Result(Status.ERROR, null, error?.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} rolePermissionRoute`;
  }
}
