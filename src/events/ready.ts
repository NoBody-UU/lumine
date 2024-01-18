import { EventBuilder } from "#lumine/builders";

export default new EventBuilder("ready").setOnce().setExecute((client) => {
	console.log(`Logged in as: ${client.user.username}`);
});
