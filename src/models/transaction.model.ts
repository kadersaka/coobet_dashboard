import TransactionsPage from "../app/transactions/page";
interface TransactionJson {
  id?: string;
  amount: string;
  user: string;
  reference: string;
  type_trans: string;
  status: string;
  phone_number: string;
  country: string;
  app: string;
  mobile_reference: string;
  withdrawal_code: string;
  created_at: string;
}

class Transaction {
  id?: string;
  amount: number;
  user: string;
  reference: string;
  typeTrans: string;
  status: string;
  phoneNumber: string;
  country: string;
  app: string;
  mobileReference: string;
  withdrawalCode: string;
  createdAt: Date;
  constructor(
    amount: number,
    user: string,
    reference: string,
    typeTrans: string,
    status: string,
    phoneNumber: string,
    country: string,
    app: string,
    mobileReference: string,
    withdrawalCode: string,
    createdAt: Date,
    id?: string,
  ) {
    (this.amount = amount),
      (this.user = user),
      (this.reference = reference),
      (this.typeTrans = typeTrans),
      (this.status = status),
      (this.phoneNumber = phoneNumber),
      (this.country = country),
      (this.app = app),
      (this.mobileReference = mobileReference),
      (this.withdrawalCode = withdrawalCode),
      (this.createdAt = createdAt),
      (this.id = id);
  }

  static fromJson(json: TransactionJson): Transaction {
    return new Transaction(
      Number.parseFloat(json.amount),
      json.user,
      json.reference,
      json.type_trans,
      json.status,
      json.phone_number,
      json.country,
      json.app,
      json.mobile_reference,
      json.withdrawal_code,
      new Date(json.created_at),
      json.id,
    );
  }

  toJson(): TransactionJson {
    return {
      id: this.id,
      amount: this.amount.toString(),
      user: this.user,
      reference: this.reference,
      type_trans: this.typeTrans,
      status: this.status,
      phone_number: this.phoneNumber,
      country: this.country,
      app: this.app,
      mobile_reference: this.mobileReference,
      withdrawal_code: this.withdrawalCode,
      created_at: this.createdAt.toISOString(),
    };
  }
}

export default Transaction;
