import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateTeacherArgs } from "./CreateTeacherArgs";
import { UpdateTeacherArgs } from "./UpdateTeacherArgs";
import { DeleteTeacherArgs } from "./DeleteTeacherArgs";
import { TeacherFindManyArgs } from "./TeacherFindManyArgs";
import { TeacherFindUniqueArgs } from "./TeacherFindUniqueArgs";
import { Teacher } from "./Teacher";
import { User } from "../../user/base/User";
import { TeacherService } from "../teacher.service";

@graphql.Resolver(() => Teacher)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TeacherResolverBase {
  constructor(
    protected readonly service: TeacherService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "read",
    possession: "any",
  })
  async _teachersMeta(
    @graphql.Args() args: TeacherFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Teacher])
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "read",
    possession: "any",
  })
  async teachers(
    @graphql.Args() args: TeacherFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Teacher[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Teacher",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Teacher, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "read",
    possession: "own",
  })
  async teacher(
    @graphql.Args() args: TeacherFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Teacher | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Teacher",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Teacher)
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "create",
    possession: "any",
  })
  async createTeacher(
    @graphql.Args() args: CreateTeacherArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Teacher> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Teacher",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Teacher"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Teacher)
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "update",
    possession: "any",
  })
  async updateTeacher(
    @graphql.Args() args: UpdateTeacherArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Teacher | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Teacher",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Teacher"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Teacher)
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "delete",
    possession: "any",
  })
  async deleteTeacher(
    @graphql.Args() args: DeleteTeacherArgs
  ): Promise<Teacher | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Teacher",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: Teacher,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
