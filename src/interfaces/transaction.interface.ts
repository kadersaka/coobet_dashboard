import { UserJson } from "./user.interface";

export interface TransactionFormData {
  amount: number;
  typeTrans: string;
  mobileReference: string;
  countryCodeCode?: string;
  phoneNumber: string;
  app?: string;
  userAppId?: string;
}

export interface TransactionFormErrors {
  amount: string | null;
  typeTrans: string | null;
  mobileReference: string | null;
  phoneNumber: string | null;
  app: string | null;
  userAppId: string | null;
}

export interface TransactionJson {
  id?: string;
  amount: string;
  user: UserJson;
  reference: string;
  type_trans: string;
  status: string;
  indication?: string;
  phone_number: string;
  country: string;
  mobile_reference: string;
  app?: string;
  user_app_id?: string;
  withdrawal_code?: string;
  created_at: string | Date;
}
