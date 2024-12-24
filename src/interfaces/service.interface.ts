export interface ServiceFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  phoneIndication: string;
  secretKey: string;
  isActive: boolean;
}

export interface ServiceFormErors {
  id: string | string;
  name: string | string;
  email: string | string;
  phone: string | string;
  phoneIndication: string | string;
  secretKey: string | string;
  isActive: string | string;
}

export interface ServiceJson {
  id: string;
  name: string;
  email: string;
  phone: string;
  phone_indication: string;
  secret_key: string;
  is_active: boolean;
}
