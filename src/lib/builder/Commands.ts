import {
	type CreateChatInputApplicationCommandOptions,
	type ApplicationCommandOptions,
	type PermissionName,
	ApplicationCommandTypes,
} from "oceanic.js";
import type { AutocompleteFn, CommandData, CommandExecuteFn, CommandOptions, RestOrArray } from "#lumine/types";
import { Validations } from "#lumine/validations";

export class LumineCommand implements CommandData {
	readonly data: Partial<CreateChatInputApplicationCommandOptions>;
	readonly options: CommandOptions;

	public execute?: CommandExecuteFn;
	public autocomplete?: AutocompleteFn;

	constructor() {
		this.data = { type: ApplicationCommandTypes.CHAT_INPUT };
		this.options = { toGuild: false };

		this.execute = undefined;
		this.autocomplete = undefined;
	}

	/**
	 *
	 * Set the command name.
	 * @param name - Command name
	 * @returns
	 */
	public setName(name: string): this {
		this.data.name = name;
		return this;
	}

	/**
	 *
	 * Set the command description
	 * @param description - Command description.
	 * @returns
	 */
	public setDescription(description: string): this {
		this.data.description = description;
		return this;
	}

	/**
	 *
	 * Set the command execute function.
	 * @param execute - Command execute function.
	 * @returns
	 */
	public setExecute(execute: CommandExecuteFn): this {
		this.execute = execute;
		return this;
	}

	/**
	 *
	 * Set the command autocomplete function.
	 * @param autocomplete - Command autocomplete function.
	 * @returns
	 */
	public setAutocomplete(autocomplete: AutocompleteFn): this {
		this.autocomplete = autocomplete;
		return this;
	}

	/**
	 *
	 * Send the command to the developer guild(s).
	 * @returns
	 */
	public sendToGuild(): this {
		this.options.toGuild = true;
		return this;
	}

	/**
	 *
	 * Set the command user permissions.
	 * @param permissions - Command permissions.
	 * @returns
	 */
	public setUserPermissions(...permissions: RestOrArray<PermissionName>): this {
		this.options.userPermissions = Validations.normalizeArray(permissions);
		return this;
	}

	/**
	 *
	 * Set the command bot permissions.
	 * @param permissions - Command permissions.
	 * @returns
	 */
	public setBotPermissions(...permissions: RestOrArray<PermissionName>): this {
		this.options.botPermissions = Validations.normalizeArray(permissions);
		return this;
	}

	/**
	 *
	 * Set the command options.
	 * @param permissions - Command options.
	 * @returns
	 */
	public setOptions(...options: RestOrArray<ApplicationCommandOptions>): this {
		this.data.options = Validations.normalizeArray(options);
		return this;
	}
}
