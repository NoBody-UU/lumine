import type { CreateApplicationCommandOptions, CommandInteraction } from "oceanic.js";
import type { Awaitable } from "#lumine/types";
import { Lumine } from "#lumine/client";

export abstract class LumineCommand {
    readonly data: CreateApplicationCommandOptions;

    abstract toGuild?: boolean;

    constructor(data: CreateApplicationCommandOptions) {
        this.data = data;
    };

    public abstract execute(client: Lumine, interaction: CommandInteraction): Awaitable<any>;
};