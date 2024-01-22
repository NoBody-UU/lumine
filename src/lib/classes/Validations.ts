import { InvalidVariable } from "#lumine/errors";

export class Validations {
	static validateEnv(): void {
		if (!process.env.TOKEN) throw new InvalidVariable("Lumine is missing the bot token.");
		if (!process.env.DATABASE_URL) throw new InvalidVariable("Lumine is missing the bot mongodb uri.");
	}
}
