import Complaint from "./complaint.model";
import { ComplaintResponseJson } from "@/interfaces/complaint_response.interface";

class ComplaintResponse {
  id?: string;
  reclamation: Complaint;
  response: string;
  createdAt: Date;

  constructor(
    reclamation: Complaint,
    response: string,
    createdAt: Date,
    id?: string,
  ) {
    this.reclamation = reclamation;

    this.response = response;
    this.createdAt = createdAt;
    this.id = id;
  }

  static fromJson(json: ComplaintResponseJson): ComplaintResponse {
    return new ComplaintResponse(
      Complaint.fromJson(json.reclamation),
      json.response,
      new Date(json.created_at),

      json.id,
    );
  }

  toJson(): ComplaintResponseJson {
    return {
      id: this.id,
      response: this.response,
      reclamation: this.reclamation.toJson(),
      created_at: this.createdAt.toISOString(),
    };
  }
}

export default ComplaintResponse;
