import { LumineComponent } from "#lumine/builders";
import { ComponentTypes } from "oceanic.js";

export default new LumineComponent(ComponentTypes.BUTTON)
	.setCustomId("testComponent")
	.setExecute((_client, interaction) => {
		interaction.reply({ content: "the test button works!" });
	});
