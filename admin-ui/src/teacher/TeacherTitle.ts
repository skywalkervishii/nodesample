import { Teacher as TTeacher } from "../api/teacher/Teacher";

export const TEACHER_TITLE_FIELD = "name";

export const TeacherTitle = (record: TTeacher): string => {
  return record.name || record.id;
};
