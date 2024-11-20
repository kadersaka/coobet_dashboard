import PaginatedChampionship, {
  PaginatedChampionshipJson,
} from "@/models/paginated_championship.model";
import api from "@/utils/api.util";

class ChampionshipApi {
  private static route: string = "/championships";

  static async findMany(
    searchField: string = "",
    page: number = 1,
  ): Promise<PaginatedChampionship> {
    try {
      const response = await api.get<PaginatedChampionshipJson>(
        `${this.route}?search_field=${searchField}&page=${page}`,
      );
      return PaginatedChampionship.fromJson(response);
    } catch (error) {
      console.error("Error fetching championships:", error);
      throw error;
    }
  }

  static async findUnique(championshipId: string): Promise<Championship> {
    try {
      const response = await api.get<ChampionshipJson>(
        `${this.route}/${championshipId}`,
      );
      return Championship.fromJson(response);
    } catch (error) {
      console.error(
        `Error fetching championship with ID ${championshipId}:`,
        error,
      );
      throw error;
    }
  }

  static async add(championship: Championship): Promise<Championship> {
    try {
      const championshipJson = championship.toJson();
      const response = await api.post<ChampionshipJson>(
        this.route,
        championshipJson,
      );
      return Championship.fromJson(response);
    } catch (error) {
      console.error("Error creating championship:", error);
      throw error;
    }
  }

  static async update(
    championshipId: string,
    championship: Championship,
  ): Promise<Championship> {
    try {
      const championshipJson = championship.toJson();
      const response = await api.put<ChampionshipJson>(
        `${this.route}/${championshipId}`,
        championshipJson,
      );
      return Championship.fromJson(response);
    } catch (error) {
      console.error(
        `Error updating championship with ID ${championshipId}:`,
        error,
      );
      throw error;
    }
  }

  static async remove(championshipId: string): Promise<void> {
    try {
      await api.delete<void>(`${this.route}/${championshipId}`);
    } catch (error) {
      console.error(
        `Error deleting championship with ID ${championshipId}:`,
        error,
      );
      throw error;
    }
  }
}

export default ChampionshipApi;
