import { LumineEvent } from "#lumine/builders";
import type { Lumine } from "#lumine/client";
import { type AnyInteractionGateway, InteractionTypes, MessageFlags } from "oceanic.js"

export default class InteractionCreate extends LumineEvent<"interactionCreate"> {
    constructor() {
        super({ name: "interactionCreate" });
    };

    public override async execute(client: Lumine, interaction: AnyInteractionGateway) {
        if (interaction.type === InteractionTypes.APPLICATION_COMMAND) {
            const { data } = interaction;
            const { name: commandName } = data;

            const command = client.commands.get(commandName);
            if (!command) return;

            try {
                await command.execute(client, interaction);
            } catch (error) {
                interaction.reply({ content: "An error ocurred i guess?", flags: MessageFlags.EPHEMERAL });
                console.log(error);
            };
        };
    }
};