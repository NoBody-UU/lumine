
import { ApplicationCommandTypes, CommandInteraction, MessageActionRow } from "oceanic.js";
import { ComponentBuilder, Button, ButtonColors, EmbedBuilder } from "@oceanicjs/builders";
import { LumineCommand } from "#lumine/builders";
import { Lumine } from "#lumine/client";

export default class ComponentsCommand extends LumineCommand {
    constructor() {
        super({
            data: {
                type: ApplicationCommandTypes.CHAT_INPUT,
                name: "components",
                description: "A test components command."
            },
            options: {
                toGuild: true,
            },
        });
    };

    public autocomplete: undefined;
    public override async execute(client: Lumine, interaction: CommandInteraction) {

        const embed = new EmbedBuilder()
            .setDescription(["YO YO YO", "YO LE PARE EL TAXI", "Mee lo", "Paro", "El taxi"])
            .setColor(client.config.colors.main)
            .toJSON();

        const builder = new ComponentBuilder<MessageActionRow>()
            .addComponent(new Button(ButtonColors.GREY, "testComponent").setLabel("Test"))
            .toJSON();

        interaction.reply({ embeds: [embed], components: builder });
    };
}