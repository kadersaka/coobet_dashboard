import { UserJson } from "./user.interface";
import Complaint from "../models/complaint.model";

export interface ComplaintJson {
  id?: string;
  email: string;
  fullname: string;
  message: string;
  user: UserJson;
}

export interface ComplaintResponseFormData {
  response: string;
}

export interface ComplaintResponseFormError {
  response: string;
}
