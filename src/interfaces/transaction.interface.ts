import { AppJson } from "./app.interface";
import { UserJson } from "./user.interface";

export interface TransactionFormData {
  reference?: string;
  amount: number;
  typeTrans: string;
  mobileReference: string;
  countryCodeCode?: string;
  phoneNumber: string;
  app?: string;
  userAppId?: string;
}

export interface TransactionFiterFormData {
  reference: string;
  status: string;
  type: string;
  countryCodeCode: string;
  phoneNumber: string;
  userAppId: string;
  mobileReference: string;
  withdriwalCode: string;
  userEmail: string;
  app: string;
}

export interface TransactionFiterFormErrors {
  reference: string | null;
  status: string | null;
  type: string | null;
  phoneNumber: string | null;
  userAppId: string | null;
  mobileReference: string | null;
  withdriwalCode: string | null;
  userEmail: string | null;
  app: string | null;
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
  app?: AppJson;
  user_app_id?: string;
  withdrawal_code?: string;
  created_at: string | Date;
}
