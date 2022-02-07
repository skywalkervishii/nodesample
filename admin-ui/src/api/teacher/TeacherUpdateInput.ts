import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeacherUpdateInput = {
  name?: string | null;
  user?: UserWhereUniqueInput | null;
};
