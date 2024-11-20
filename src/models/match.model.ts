interface MatchJson {
  id?: string;
  club_home: ClubJson;
  club_foreign: ClubJson;
  start_date: string;
  club_home_goal: string | null;
  club_foreign_goal: string | null;
}

class Match {
  id?: string;
  clubHome: Club;
  clubForeign: Club;
  startDate: Date;
  clubHomeGoal: string | null;
  clubForeignGoal: string | null;

  constructor(
    clubHome: Club,
    clubForeign: Club,
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
    this.id = id;
  }

  static fromJson(json: MatchJson): Match {
    return new Match(
      Club.fromJson(json.club_home),
      Club.fromJson(json.club_foreign),
      new Date(json.start_date),
      json.club_home_goal,
      json.club_foreign_goal,
      json.id,
    );
  }

  toJson(): MatchJson {
    return {
      id: this.id,
      club_home: this.clubHome.toJson(),
      club_foreign: this.clubForeign.toJson(),
      start_date: this.startDate.toISOString(),
      club_home_goal: this.clubHomeGoal,
      club_foreign_goal: this.clubForeignGoal,
    };
  }
}
