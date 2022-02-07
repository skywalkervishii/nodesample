import { User } from "../user/User";

export type Teacher = {
  createdAt: Date;
  id: string;
  name: string | null;
  updatedAt: Date;
  user?: User | null;
};
