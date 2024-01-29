import type { ComponentData, ComponentDataObject, ComponentExecuteFn } from "#lumine/types";
import type { ComponentTypes } from "oceanic.js";

export class LumineComponent<K extends ComponentTypes> implements ComponentData<K> {
	readonly data: Partial<ComponentDataObject>;
	public execute?: ComponentExecuteFn<K>;

	/**
	 *
	 * Set the component type.
	 * @param type - Component type.
	 */
	constructor(type: K) {
		this.data = { type };
		this.execute = undefined;
	}

	/**
	 *
	 * Set the component customId.
	 * @param customId - Component customId
	 * @returns
	 */
	public setCustomId(customId: string) {
		this.data.customId = customId;
		return this;
	}

	/**
	 *
	 * Set the component execute function.
	 * @param execute - Component execute function.
	 * @returns
	 */
	public setExecute(execute: ComponentExecuteFn<K>) {
		this.execute = execute;
		return this;
	}
}
