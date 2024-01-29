import { LumineEvent } from "#lumine/builders";

export default new LumineEvent("ready").setOnce().setExecute(async (client) => {
	await client.deployCommands();
	await client.database.connect();

	client.logger.info(`Client ~ Logged in as: ${client.user.username}.`);
});
