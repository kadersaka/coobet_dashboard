import { UserJson } from "./user.interface";

export interface ComplaintJson {
  id?: string;
  email: string;
  fullname: string;
  message: string;
  user: UserJson;
}
