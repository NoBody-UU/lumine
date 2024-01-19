import { LumineCommand } from "#lumine/builders";
import { ApplicationCommandTypes, type CommandInteraction } from "oceanic.js";
import type { Lumine } from "#lumine/client";

export default class PingCommand extends LumineCommand {
    toGuild = false;
    
    constructor() {
        super({
            type: ApplicationCommandTypes.CHAT_INPUT,
            name: "pong",
            description: "Respond with ping!",
        });
    };

    public execute(client: Lumine, interaction: CommandInteraction) {
        interaction.reply({ content: "ping! (global hehe)" });
    };
};