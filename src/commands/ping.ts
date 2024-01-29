import { LumineCommand } from "#lumine/builders";
import { EmbedBuilder } from "@oceanicjs/builders";

export default new LumineCommand()
	.setName("ping")
	.setDescription("Respond with pong!")
	.sendToGuild()
	.setExecute(async (client, interaction) => {
		const embed = new EmbedBuilder().setDescription("Pong!").setColor(client.config.colors.main).toJSON();

		await interaction.reply({ content: "pong! (guild hehe)", embeds: [embed] });
	});
