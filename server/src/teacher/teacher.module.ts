import { Module } from "@nestjs/common";
import { TeacherModuleBase } from "./base/teacher.module.base";
import { TeacherService } from "./teacher.service";
import { TeacherController } from "./teacher.controller";
import { TeacherResolver } from "./teacher.resolver";

@Module({
  imports: [TeacherModuleBase],
  controllers: [TeacherController],
  providers: [TeacherService, TeacherResolver],
  exports: [TeacherService],
})
export class TeacherModule {}
