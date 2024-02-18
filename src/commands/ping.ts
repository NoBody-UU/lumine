import { Declare, Command, CommandContext } from "paragonjs";

@Declare({
   name: "ping",
   description: "Ping command",
})
export default class PingCommand extends Command {
    async run(ctx: CommandContext) {
        await ctx.write({ content: "pong!" });
    }
}