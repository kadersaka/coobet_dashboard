export interface ChampionshipJson {
  id?: string;
  name: string;
  sport: string;
}

export interface ChampionshipFormData {
  name: string;
  sport: string;
}

export interface ChampionshipFormErrors {
  name: string | null;
  sport: string | null;
}
