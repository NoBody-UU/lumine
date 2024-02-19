import { type Command, createMiddleware } from "seyfert";
import { MessageFlags } from "seyfert/lib/common/index.js";

export const LumineCooldown = createMiddleware<void>(async (middleware) => {
	const { context, next, pass } = middleware;
	const commandName = context.resolver.fullCommandName;
	const cache = context.client.cooldowns;

	const command = context.client.commands.values.find((x) => x.name === commandName) as Command | undefined;
	if (!command) return pass();

	const now = Date.now();
	const cooldown = command.rateLimit;
	if (!cooldown) return next();

	const userCooldown = cache.get(`${commandName}-${context.author.id}`);
	if (!userCooldown) {
		cache.set(`${commandName}-${context.author.id}`, now + cooldown * 1000);
		setTimeout(() => cache.delete(`${commandName}-${context.author.id}`), cooldown * 1000);
		return next();
	}

	if (now < userCooldown)
		return context.write({
			content: `You need to wait <t:${Math.floor(userCooldown / 1000)}:R> to use this.`,
			flags: MessageFlags.Ephemeral,
		});
});
