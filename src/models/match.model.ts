interface MatchJson {
  id?: string;
  club_home: string;
  club_foreign: string;
  start_date: string;
  club_home_goal: string | null;
  club_foreign_goal: string | null;
}

class Match {
  id?: string;
  clubHome: string;
  clubForeign: string;
  startDate: Date;
  clubHomeGoal: string | null;
  clubForeignGoal: string | null;

  constructor(
    clubHome: string,
    clubForeign: string,
    startDate: Date,
    clubHomeGoal: string | null,
    clubForeignGoal: string | null,
    id?: string,
  ) {
    this.clubHome = clubHome;
    this.clubForeign = clubForeign;
    this.startDate = startDate;
    this.clubHomeGoal = clubHomeGoal;
    this.clubForeignGoal = clubForeignGoal;
  }

  static fromJson(json: MatchJson): Match {
    return new Match(
      json.club_home,
      json.club_foreign,
      new Date(json.start_date),
      json.club_home_goal,
      json.club_foreign_goal,
      json.id,
    );
  }

  toJson(): MatchJson {
    return {
      id: this.id,
      club_home: this.clubHome,
      club_foreign: this.clubForeign,
      start_date: this.startDate.toISOString(),
      club_home_goal: this.clubHomeGoal,
      club_foreign_goal: this.clubForeignGoal,
    };
  }
}
