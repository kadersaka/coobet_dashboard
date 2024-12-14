import { ComplaintJson } from "./complaint.interface";
import { UserJson } from "./user.interface";

export interface ComplaintResponseJson {
  id?: string;
  reclamation: ComplaintJson;
  response: string;
  created_at: string;
}

export interface ComplaintResponseFormData {
  response: string;
}

export interface ComplaintResponseFormError {
  response: string | null;
}
