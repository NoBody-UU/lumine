import { LumineCommand } from "#lumine/builders";
import { ApplicationCommandTypes, CommandInteraction } from "oceanic.js";
import { Lumine } from "#lumine/client";

export default class ComponentCommand extends LumineCommand {
    constructor() {
        super({
            data: {
                type: ApplicationCommandTypes.CHAT_INPUT,
                name: "component",
                description: "A components test command",
            },
            options: {
                toGuild: true,
            },
        });
    };

    public autocomplete: undefined;
    public override async execute(client: Lumine, interaction: CommandInteraction) {
        interaction.reply({ content: "Click the button below" });
    };
};