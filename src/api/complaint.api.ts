import api from "@/utils/api.util";
import Complaint, { ComplaintJson } from "@/models/complaint.model";
import PaginatedClub from "@/models/paginated_club.model";
import PaginatedComplaint, {
  PaginatedComplaintJson,
} from "@/models/paginated_complaint.model";

class ComplaintApi {
  private static route: string = "/complaints";

  static async findMany(
    searchField: string = "",
    page: number = 1,
  ): Promise<PaginatedComplaint> {
    try {
      const response = await api.get<PaginatedComplaintJson>(
        `${this.route}?search_field=${searchField}&page=${page}`,
      );
      return PaginatedComplaint.fromJson(response);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      throw error;
    }
  }

  static async findUnique(complaintId: string): Promise<Complaint> {
    try {
      const response = await api.get<ComplaintJson>(
        `${this.route}/${complaintId}`,
      );
      return Complaint.fromJson(response);
    } catch (error) {
      console.error(`Error fetching complaint with ID ${complaintId}:`, error);
      throw error;
    }
  }

  static async add(complaint: Complaint): Promise<Complaint> {
    try {
      const complaintJson = complaint.toJson();
      const response = await api.post<ComplaintJson>(this.route, complaintJson);
      return Complaint.fromJson(response);
    } catch (error) {
      console.error("Error creating complaint:", error);
      throw error;
    }
  }

  static async update(
    complaintId: string,
    complaint: Complaint,
  ): Promise<Complaint> {
    try {
      const complaintJson = complaint.toJson();
      const response = await api.put<ComplaintJson>(
        `${this.route}/${complaintId}`,
        complaintJson,
      );
      return Complaint.fromJson(response);
    } catch (error) {
      console.error(`Error updating complaint with ID ${complaintId}:`, error);
      throw error;
    }
  }

  static async remove(complaintId: string): Promise<void> {
    try {
      await api.delete<void>(`${this.route}/${complaintId}`);
    } catch (error) {
      console.error(`Error deleting complaint with ID ${complaintId}:`, error);
      throw error;
    }
  }
}

export default ComplaintApi;
