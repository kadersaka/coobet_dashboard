import { UserJson } from "@/interfaces/user.interface";
import User from "./user.model";
import { TransactionJson } from "@/interfaces/transaction.interface";

class Transaction {
  id?: string;
  amount: number;
  user: User;
  reference: string;
  typeTrans: string;
  status: string;
  phoneNumber: string;
  country: string;
  mobileReference: string;
  app?: string;
  userAppId?: string;
  createdAt?: Date;
  withdrawalCode?: string;

  constructor(
    amount: number,
    user: User,
    reference: string,
    typeTrans: string,
    status: string,
    phoneNumber: string,
    country: string,
    mobileReference: string,
    createdAt: Date,
    app?: string,
    userAppId?: string,
    withdrawalCode?: string,
    id?: string,
  ) {
    this.amount = amount;
    this.user = user;
    this.reference = reference;
    this.typeTrans = typeTrans;
    this.status = status;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.app = app;
    this.userAppId = userAppId;
    this.mobileReference = mobileReference;
    this.withdrawalCode = withdrawalCode;
    this.createdAt = createdAt;
    this.id = id;
  }

  static fromJson(json: TransactionJson): Transaction {
    return new Transaction(
      Number.parseInt(json.amount),
      User.fromJson(json.user),
      json.reference,
      json.type_trans,
      json.status,
      json.phone_number,
      json.country,
      json.mobile_reference,
      new Date(json.created_at),
      json.app,
      json.user_app_id,
      json.withdrawal_code,
      json.id,
    );
  }

  toJson(): TransactionJson {
    return {
      id: this.id,
      amount: this.amount.toString(),
      user: this.user.toJson(),
      reference: this.reference,
      type_trans: this.typeTrans,
      status: this.status,
      phone_number: this.phoneNumber,
      country: this.country,
      app: this.app,
      user_app_id: this.userAppId,
      mobile_reference: this.mobileReference,
      withdrawal_code: this.withdrawalCode,
      created_at: this.createdAt?.toISOString() ?? new Date().toISOString(),
    };
  }
}

export default Transaction;
