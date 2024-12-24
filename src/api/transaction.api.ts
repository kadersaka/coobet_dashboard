import api from "@/utils/api.util";
import Transaction from "@/models/transaction.model";
import PaginatedTransaction, {
  PaginatedTransactionJson,
} from "@/models/paginated_transaction.model";
import { TransactionJson } from "@/interfaces/transaction.interface";
import { TransactionFiterFormData } from "../interfaces/transaction.interface";

class TransactionApi {
  private static route: string = "/transaction";

  /**
   * "reference",
        "type_trans",
        "status",
        "phone_number",
        "user_app_id",
        "mobile_reference",
        "withdriwal_code",
        "user__email",

   */

  static async findMany(
    searchField?: string,
    filter?: TransactionFiterFormData,
    page?: number,
    pageSize?: number,
  ): Promise<PaginatedTransaction> {
    try {
      const response = await api.get<PaginatedTransactionJson>(
        `${this.route}?search_fields=${searchField ?? ""}&reference=${filter?.reference ?? ""}&status=${filter?.status ?? ""}&phone_number=${filter?.phoneNumber ?? ""}&user_app_id=${filter?.userAppId ?? ""}&mobile_reference=${filter?.mobileReference ?? ""}&withdriwal_code=${filter?.withdriwalCode ?? ""}&user__email=${filter?.userEmail ?? ""}&app=${filter?.app ?? ""}&service=${filter?.service ?? ""}&page=${page ?? 1}&page_size=${pageSize ?? 20}`,
      );
      return PaginatedTransaction.fromJson(response);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error;
    }
  }

  static async findUnique(transactionId: string): Promise<Transaction> {
    try {
      const response = await api.get<TransactionJson>(
        `${this.route}/${transactionId}`,
      );
      return Transaction.fromJson(response);
    } catch (error) {
      console.error(
        `Error fetching transaction with ID ${transactionId}:`,
        error,
      );
      throw error;
    }
  }

  static async add(transaction: Transaction): Promise<Transaction> {
    try {
      const transactionJson = transaction.toJson();
      const response = await api.post<TransactionJson>(
        this.route,
        transactionJson,
      );
      return Transaction.fromJson(response);
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }

  static async update(transaction: Transaction): Promise<Transaction> {
    try {
      const transactionJson = transaction.toJson();
      const response = await api.put<TransactionJson>(
        `${this.route}/${transaction.id}`,
        transactionJson,
      );
      return Transaction.fromJson(response);
    } catch (error) {
      console.error(
        `Error updating transaction with ID ${transaction.id}:`,
        error,
      );
      throw error;
    }
  }

  static async remove(transactionId: string): Promise<void> {
    try {
      await api.delete<void>(`${this.route}/${transactionId}`);
    } catch (error) {
      console.error(
        `Error deleting transaction with ID ${transactionId}:`,
        error,
      );
      throw error;
    }
  }
}

export default TransactionApi;
