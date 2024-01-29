import { LumineEvent } from "#lumine/builders";
import { commandsHandler, componentsHandler } from "#lumine/handlers";

export default new LumineEvent("interactionCreate").setExecute(async (client, interaction) => {
	await commandsHandler(client, interaction);
	await componentsHandler(client, interaction);
});
