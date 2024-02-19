import { Client, type ParseClient, type ParseMiddlewares } from "seyfert";
import { Collection } from "seyfert/lib/collection.js";
import { LumineMiddlewares } from "#lumine/middlewares";

export class Lumine extends Client {
	public readonly cooldowns = new Collection<string, number>();

	constructor() {
		super({ globalMiddlewares: ["LumineCooldown"] });
		this.run();
	}

	public async run(): Promise<"✨"> {
		this.setServices({ middlewares: LumineMiddlewares });

		await this.start();
		await this.uploadCommands();

		return "✨";
	}
}

declare module "seyfert" {
	interface Client {
		cooldowns: Collection<string, number>;
	}
	interface UsingClient extends ParseClient<Client<true>> {}
	interface RegisteredMiddlewares extends ParseMiddlewares<typeof LumineMiddlewares> {}
	interface Command {
		rateLimit?: number;
	}
}
