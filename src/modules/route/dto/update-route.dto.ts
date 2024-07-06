import { PartialType } from '@nestjs/mapped-types';
import { CreateRolePermissionRouteDto } from './create-route.dto';

export class UpdateRolePermissionRouteDto extends PartialType(CreateRolePermissionRouteDto) {}
