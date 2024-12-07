import { UserJson } from "@/interfaces/user.interface";
import User from "./user.model";
import { ComplaintJson } from "@/interfaces/complaint.interface";

class Complaint {
  id?: string;
  email: string;
  fullname: string;
  message: string;
  user: User;

  constructor(
    email: string,
    fullname: string,
    message: string,
    user: User,
    id?: string,
  ) {
    this.email = email;
    this.fullname = fullname;
    this.message = message;
    this.user = user;
    this.id = id;
  }

  static fromJson(json: ComplaintJson): Complaint {
    return new Complaint(
      json.email,
      json.fullname,
      json.message,
      User.fromJson(json.user),
      json.id,
    );
  }

  toJson(): ComplaintJson {
    return {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      message: this.message,
      user: this.user.toJson(),
    };
  }
}

export default Complaint;
