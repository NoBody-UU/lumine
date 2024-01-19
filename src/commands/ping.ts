import { EmbedBuilder, LumineCommand } from "#lumine/builders";
import { ApplicationCommandTypes, type CommandInteraction } from "oceanic.js";
import type { Lumine } from "#lumine/client";

export default class PingCommand extends LumineCommand {
    toGuild = true;
    
    constructor() {
        super({
            type: ApplicationCommandTypes.CHAT_INPUT,
            name: "ping",
            description: "Respond with pong!",
        });
    };

    public execute(client: Lumine, interaction: CommandInteraction) {
        const embed = new EmbedBuilder()
            .setAuthor(interaction.user)
            .setDescription("Pong!")
            .setColor(client.config.colors.main)
            .toJSON();

        interaction.reply({ content: "pong! (guild hehe)", embeds: [embed] });
    };
};