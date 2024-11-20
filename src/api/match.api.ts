import PaginatedMatch, {
  PaginatedMatchJson,
} from "@/models/paginated_match.model";
import api from "@/utils/api.util";

class MatchApi {
  private static route: string = "/matches";

  static async findMany(
    searchField: string = "",
    page: number = 1,
  ): Promise<PaginatedMatch> {
    try {
      const response = await api.get<PaginatedMatchJson>(
        `${this.route}?search_field=${searchField}&page=${page}`,
      );
      return PaginatedMatch.fromJson(response);
    } catch (error) {
      console.error("Error fetching matches:", error);
      throw error;
    }
  }

  static async findUnique(matchId: string): Promise<Match> {
    try {
      const response = await api.get<MatchJson>(`${this.route}/${matchId}`);
      return Match.fromJson(response);
    } catch (error) {
      console.error(`Error fetching match with ID ${matchId}:`, error);
      throw error;
    }
  }

  static async add(match: Match): Promise<Match> {
    try {
      const matchJson = match.toJson();
      const response = await api.post<MatchJson>(this.route, matchJson);
      return Match.fromJson(response);
    } catch (error) {
      console.error("Error creating match:", error);
      throw error;
    }
  }

  static async update(matchId: string, match: Match): Promise<Match> {
    try {
      const matchJson = match.toJson();
      const response = await api.put<MatchJson>(
        `${this.route}/${matchId}`,
        matchJson,
      );
      return Match.fromJson(response);
    } catch (error) {
      console.error(`Error updating match with ID ${matchId}:`, error);
      throw error;
    }
  }

  static async remove(matchId: string): Promise<void> {
    try {
      await api.delete<void>(`${this.route}/${matchId}`);
    } catch (error) {
      console.error(`Error deleting match with ID ${matchId}:`, error);
      throw error;
    }
  }
}

export default MatchApi;
