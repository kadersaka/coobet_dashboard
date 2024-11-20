import Transaction, { TransactionJson } from "./transaction.model";

export interface PaginatedTransactionJson {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransactionJson[];
}

class PaginatedTransaction {
  count: number;
  next: string | null;
  previous: string | null;
  results: Transaction[];

  constructor(
    count: number,
    next: string | null,
    previous: string | null,
    results: Transaction[],
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  static fromJson(json: PaginatedTransactionJson): PaginatedTransaction {
    return new PaginatedTransaction(
      json.count,
      json.next,
      json.previous,
      json.results.map(Transaction.fromJson),
    );
  }

  toJson(): PaginatedTransactionJson {
    return {
      count: this.count,
      next: this.next,
      previous: this.previous,
      results: this.results.map((transaction) => transaction.toJson()),
    };
  }
}

export default PaginatedTransaction;
