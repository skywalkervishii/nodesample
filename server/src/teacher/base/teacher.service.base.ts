import { PrismaService } from "nestjs-prisma";
import { Prisma, Teacher, User } from "@prisma/client";

export class TeacherServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TeacherFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherFindManyArgs>
  ): Promise<number> {
    return this.prisma.teacher.count(args);
  }

  async findMany<T extends Prisma.TeacherFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherFindManyArgs>
  ): Promise<Teacher[]> {
    return this.prisma.teacher.findMany(args);
  }
  async findOne<T extends Prisma.TeacherFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherFindUniqueArgs>
  ): Promise<Teacher | null> {
    return this.prisma.teacher.findUnique(args);
  }
  async create<T extends Prisma.TeacherCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherCreateArgs>
  ): Promise<Teacher> {
    return this.prisma.teacher.create<T>(args);
  }
  async update<T extends Prisma.TeacherUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherUpdateArgs>
  ): Promise<Teacher> {
    return this.prisma.teacher.update<T>(args);
  }
  async delete<T extends Prisma.TeacherDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TeacherDeleteArgs>
  ): Promise<Teacher> {
    return this.prisma.teacher.delete(args);
  }

  async getUser(parentId: string): Promise<User | null> {
    return this.prisma.teacher
      .findUnique({
        where: { id: parentId },
      })
      .user();
  }
}
