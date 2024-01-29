import { LumineCommand } from "#lumine/builders";
import { ApplicationCommandTypes, type CommandInteraction } from "oceanic.js";
import type { Lumine } from "#lumine/client";
import { EmbedBuilder } from "@oceanicjs/builders";

export default class PingCommand extends LumineCommand {
	constructor() {
		super({
			data: {
				type: ApplicationCommandTypes.CHAT_INPUT,
				name: "ping",
				description: "Respond with pong!",
			},
			options: {
				toGuild: true,
			},
		});
	}

	public autocomplete: undefined;
	public execute(client: Lumine, interaction: CommandInteraction) {
		const embed = new EmbedBuilder()
			.setDescription("Pong!")
			.setColor(client.config.colors.main)
			.toJSON();

		interaction.reply({ content: "pong! (guild hehe)", embeds: [embed] });
	}
}
