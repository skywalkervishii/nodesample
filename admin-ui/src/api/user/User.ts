import { Teacher } from "../teacher/Teacher";

export type User = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  roles: Array<string>;
  teachers?: Array<Teacher>;
  updatedAt: Date;
  username: string;
};
