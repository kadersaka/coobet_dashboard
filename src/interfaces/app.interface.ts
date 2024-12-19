export interface AppJson {
  id?: string;
  name: string;
  image: string;
}

export interface AppFormData {
  name: string;
  image: string;
}

export interface AppFormErrors {
  name: string | null;
  image: string | null;
}
