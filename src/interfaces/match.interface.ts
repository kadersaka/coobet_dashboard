import Club from "@/models/club.model";
import { ClubJson } from "./club.interface";

export interface MatchJson {
  id?: string;
  club_home: ClubJson;
  club_foreign: ClubJson;
  start_date: string;
  club_home_goal: number | null;
  club_foreign_goal: number | null;
}

export interface MatchFormData {
  clubHome: Club;
  clubForeign: Club;
  startDate: Date;
  clubHomeGoal: number | null;
  clubForeignGoal: number | null;
}

export interface MatchFormErrors {
  clubHome: string | null;
  clubForeign: string | null;
  startDate: string | null;
  clubHomeGoal: string | null;
  clubForeignGoal: string | null;
}
