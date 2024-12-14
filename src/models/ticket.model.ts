import { TicketJson } from "@/interfaces/ticket.interface";
import Event from "./event.model";
import { EventJson } from "@/interfaces/event.interface";

class Ticket {
  id?: string;
  events: Event[];
  status: string;
  sample: string;
  subscription?: string;
  createdAt: Date;

  constructor(
    events: Event[],
    status: string,
    sample: string,
    createdAt: Date,
    subscription?: string,
    id?: string,
  ) {
    this.events = events;
    this.status = status;
    this.sample = sample;
    this.subscription = subscription;
    this.createdAt = createdAt;
    this.id = id;
  }

  static fromJson(json: TicketJson): Ticket {
    return new Ticket(
      (json.events as EventJson[]).map((eventJson) =>
        Event.fromJson(eventJson),
      ),
      json.status,
      json.sample,
      new Date(json.created_at),
      json.abonnement,
      json.id,
    );
  }

  toJson(): TicketJson {
    return {
      id: this.id,
      events: this.events.map((event) => event.id!),
      sample: this.sample,
      status: this.status,
      abonnement: this.subscription ?? "",
      created_at: this.createdAt.toDateString(),
    };
  }
}

export default Ticket;
