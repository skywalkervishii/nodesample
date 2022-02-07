import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { TeacherResolverBase } from "./base/teacher.resolver.base";
import { Teacher } from "./base/Teacher";
import { TeacherService } from "./teacher.service";

@graphql.Resolver(() => Teacher)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TeacherResolver extends TeacherResolverBase {
  constructor(
    protected readonly service: TeacherService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
