interface ChampionshipJson {
  id?: string;
  name: string;
  sport: string;
}

class Championship {
  id?: string;
  name: string;
  sport: string;
  constructor(name: string, sport: string, id?: string) {
    this.name = name;
    this.sport = sport;
    this.id = id;
  }

  static fromJson(json: ChampionshipJson): Championship {
    return new Championship(json.name, json.sport, json.id);
  }

  toJson(): ChampionshipJson {
    return {
      id: this.id,
      name: this.name,
      sport: this.sport,
    };
  }
}
