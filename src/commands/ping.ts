import { Declare, Command, type CommandContext } from "seyfert";

@Declare({
	name: "ping",
	description: "Ping command",
})
export default class PingCommand extends Command {
	rateLimit = 10;

	async run(ctx: CommandContext) {
		await ctx.write({ content: "pong!" });
	}
}
