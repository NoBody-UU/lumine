import type { MessageActionRow } from "oceanic.js";
import { ComponentBuilder, Button, ButtonColors, EmbedBuilder } from "@oceanicjs/builders";
import { LumineCommand } from "#lumine/builders";

export default new LumineCommand()
	.setName("components")
	.setDescription("A test components command.")
	.sendToGuild()
	.setExecute(async (client, interaction) => {
		const embed = new EmbedBuilder()
			.setDescription(["YO YO YO", "YO LE PARE EL TAXI", "Mee lo", "Paro", "El taxi"])
			.setColor(client.config.colors.main)
			.toJSON();

		const builder = new ComponentBuilder<MessageActionRow>()
			.addComponent(new Button(ButtonColors.GREY, "testComponent").setLabel("Test"))
			.toJSON();

		await interaction.reply({ embeds: [embed], components: builder });
	});
