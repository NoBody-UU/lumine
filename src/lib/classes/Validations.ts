import { InvalidVariable } from "#lumine/errors";
import type { RestOrArray } from "#lumine/types";

export class Validations {
	static validateEnv(): void {
		if (!process.env.TOKEN) throw new InvalidVariable("Lumine is missing the bot token.");
		if (!process.env.DATABASE_URL) throw new InvalidVariable("Lumine is missing the bot mongodb uri.");
	}

	static normalizeArray<ItemType>(arr: RestOrArray<ItemType>): ItemType[] {
		if (Array.isArray(arr[0])) return arr[0];
		return arr as ItemType[];
	}
}
