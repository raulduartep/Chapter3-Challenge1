import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const games = await this.repository
      .createQueryBuilder()
      .where("title ILIKE :title", { title: `%${param}%` })
      .getMany();
    // Complete usando query builder

    return games;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const count = this.repository.query("SELECT COUNT(id) FROM games"); // Complete usando raw query

    return count;
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games = await this.repository
      .createQueryBuilder("games")
      .leftJoinAndSelect("games.users", "user")
      .where("games.id = :id", { id })
      .getOne();

    const users = games?.users || [];

    return users;
    // Complete usando query builder
  }
}
