import { TeacherWhereInput } from "./TeacherWhereInput";
import { TeacherOrderByInput } from "./TeacherOrderByInput";

export type TeacherFindManyArgs = {
  where?: TeacherWhereInput;
  orderBy?: TeacherOrderByInput;
  skip?: number;
  take?: number;
};
