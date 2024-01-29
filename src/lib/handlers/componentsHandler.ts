import { MessageFlags, type Interaction } from "oceanic.js";
import type { Lumine } from "#lumine/client";
import { LumineColors } from "#lumine/types";
import { EmbedBuilder } from "@oceanicjs/builders";

export async function componentsHandler(client: Lumine, interaction: Interaction) {
	if (interaction.isComponentInteraction()) {
		if (interaction.isButtonComponentInteraction()) {
			const { data } = interaction;
			const { customID } = data;

			const component = client.components.buttons.get(customID);
			if (!component || !component.execute) return;

			try {
				await component.execute(client, interaction);
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
}
