import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RouteService } from 'src/modules/route/route.service';
import { AdminService } from 'src/modules/admin/admin.service';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RouteGuard implements CanActivate {
  constructor(
    private routeService: RouteService, 
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const requestPath = request.url;
    const requestMethod = request.method;

    // Retrieve token from headers
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Extract token from header (assuming it's in the format: Bearer <token>)
    const token = authorizationHeader.split(' ')[1];
    const extractData = await this.authService.extractToken(token);
    if (!extractData.data.email) {
      throw new UnauthorizedException('!extractData.data.email');
    }
    // get admin
    const foundAdmin = await this.adminService.findAdmin(extractData.data.email);
    if (!foundAdmin.data) {
      return false;
    }
    // get permision and role of this route from database
    const dbGetRouteRes = await this.routeService.findByRouteName(requestPath, requestMethod);
    if (!dbGetRouteRes.data) {
      return false;
    }

    // compare role|permisison of admin with request
    const adminRoles = foundAdmin.data.roles;
    const adminPermissions = foundAdmin.data.permissions;

    const routeRoles = dbGetRouteRes.data.roles;
    const routePermissions = dbGetRouteRes.data.permissions;

    return (comparePermission(adminPermissions, routePermissions) && compareRole(adminRoles, routeRoles));
  }
}

function compareRole(adminRoles, routeRoles) {
  if (routeRoles.length === 0) {
    return true;
  }
  for (const adminRole of adminRoles) {
    for (const routeRole of routeRoles) {
      if (adminRole.id === routeRole.id) {
        return true;
      }
    }
  }
  return false;
}
function comparePermission(adminPermisions, routePermissions) {
  if (routePermissions.length === 0) {
    return true;
  }
  for (const adminPer of adminPermisions) {
    for (const routePer of routePermissions) {
      if (adminPer.id === routePer.id) {
        return true;
      }
    }
  }
  return false;
}