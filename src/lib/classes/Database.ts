import type { Lumine } from "#lumine/client";
import { PrismaClient } from "@prisma/client";
import { TaskMap } from "taskwizard";

export class Database {
  private _prisma: PrismaClient;
  readonly _client: Lumine;
  readonly userCache:TaskMap<string, any>;
  readonly guildCache: TaskMap<string, any>;

  public constructor(client: Lumine) {
    this._prisma = new PrismaClient();
    this._client = client;
    this.userCache = new TaskMap<string, any>(client.config.cache.users);
    this.guildCache = new TaskMap<string, any>(client.config.cache.guilds);
  }

  public async connect(): Promise<void> {
    await this._prisma.$connect().catch((err) => {
      console.log(err);
      process.exit(1);
    });

    //because we don't have logger yet
    console.log("Database connected successfully");
  }
}