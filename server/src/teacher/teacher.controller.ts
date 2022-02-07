import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TeacherService } from "./teacher.service";
import { TeacherControllerBase } from "./base/teacher.controller.base";

@swagger.ApiTags("teachers")
@common.Controller("teachers")
export class TeacherController extends TeacherControllerBase {
  constructor(
    protected readonly service: TeacherService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
