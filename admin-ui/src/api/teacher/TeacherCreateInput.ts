import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type TeacherCreateInput = {
  name?: string | null;
  user?: UserWhereUniqueInput | null;
};
