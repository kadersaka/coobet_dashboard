import User, { UserJson } from "./user.model";

export interface PaginatedUserJson {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserJson[];
}

class PaginatedUser {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];

  constructor(
    count: number,
    next: string | null,
    previous: string | null,
    results: User[],
  ) {
    this.count = count;
    this.next = next;
    this.previous = previous;
    this.results = results;
  }

  static fromJson(json: PaginatedUserJson): PaginatedUser {
    return new PaginatedUser(
      json.count,
      json.next,
      json.previous,
      json.results.map(User.fromJson),
    );
  }

  toJson(): PaginatedUserJson {
    return {
      count: this.count,
      next: this.next,
      previous: this.previous,
      results: this.results.map((user) => user.toJson()),
    };
  }
}

export default PaginatedUser;
