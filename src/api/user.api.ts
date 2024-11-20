import api from "@/utils/api.util";
import User, { UserJson } from "../models/user.model";
import PaginatedUser, {
  PaginatedUserJson,
} from "@/models/paginated_user.model";

class UserApi {
  private static route: string = "/users";

  static async findMany(
    searchField: string = "",
    page: number = 1,
  ): Promise<PaginatedUser> {
    try {
      const response = await api.get<PaginatedUserJson>(
        `${this.route}?search_field=${searchField}&page=${page}`,
      );
      return PaginatedUser.fromJson(response);
    } catch (error) {
      console.error("Error fetching paginated users:", error);
      throw error;
    }
  }

  static async findUnique(userId: string): Promise<User> {
    try {
      const response = await api.get<UserJson>(`${this.route}/${userId}`);
      return User.fromJson(response);
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  }

  static async add(user: User): Promise<User> {
    try {
      const userJson = user.toJson();
      const response = await api.post<UserJson>("${this.route}", userJson);
      return User.fromJson(response);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  static async update(userId: string, user: User): Promise<User> {
    try {
      const userJson = user.toJson();
      const response = await api.put<UserJson>(
        `${this.route}/${userId}`,
        userJson,
      );
      return User.fromJson(response);
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  }

  static async remove(userId: string): Promise<void> {
    try {
      await api.delete<void>(`${this.route}/${userId}`);
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  }
}

export default UserApi;
