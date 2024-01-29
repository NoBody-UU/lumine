import type { Lumine } from "#lumine/client";
import { MessageFlags, type Interaction } from "oceanic.js";
import { LumineColors } from "#lumine/types";
import { EmbedBuilder } from "@oceanicjs/builders";

export async function commandsHandler(client: Lumine, interaction: Interaction) {
	if (interaction.isAutocompleteInteraction()) {
		const { data } = interaction;
		const { name: commandName } = data;

		const command = client.commands.get(commandName);
		if (!command || !command.autocomplete) return;

		try {
			await command.autocomplete(client, interaction);
		} catch (error) {
			interaction.result([{ name: "Lumine - An error ocurred trying to execute this.", value: "commandError" }]);
			client.logger.error(`Error: ${error}`);
		}
	} else if (interaction.isCommandInteraction()) {
		const { data } = interaction;
		const { name: commandName } = data;

		const command = client.commands.get(commandName);
		if (!command || !command.execute) return;

		try {
			await command.execute(client, interaction);
		} catch (error) {
			const embed = new EmbedBuilder()
				.setDescription("`❌` An error ocurred trying to execute this.")
				.setColor(LumineColors.Red)
				.setTimestamp(new Date())
				.toJSON();

			client.logger.error(`Error: ${error}`);
			interaction.reply({ embeds: [embed], flags: MessageFlags.EPHEMERAL });
		}
	}
}
