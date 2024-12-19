import Club from "@/models/club.model";
import { ClubJson } from "./club.interface";
import { Moment } from "moment";
import Match from "@/models/match.model";
import { MatchJson } from "./match.interface";
import Event from "@/models/event.model";
import { EventJson } from "./event.interface";

export interface TicketJson {
  id?: string;
  events: EventJson[] | string[];
  created_at: string;
  status: string;
  sample: string;
  abonnement: string;
  bet_amount: string;
}

export interface TicketFormData {
  events: Event[];
  status: string | null;
  sample: string | null;
  subscription: string | null;
  betAmount: string | null;
}

export interface TicketFormErrors {
  events: string | null;
  status: string | null;
  sample: string | null;
  subscription: string | null;
  betAmount: string | null;
}
