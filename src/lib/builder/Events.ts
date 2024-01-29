import type { ClientEvents } from "oceanic.js";
import type { EventData, EventExecuteFn } from "#lumine/types";

export class LumineEvent<K extends keyof ClientEvents> implements EventData<K> {
	readonly name?: K;
	readonly once?: boolean;

	public execute?: EventExecuteFn<K>;

	/**
	 *
	 * Set the event name.
	 * @param name - Event name.
	 */
	constructor(name: K) {
		this.name = name;
		this.once = false;
		this.execute = undefined;
	}

	/**
	 *
	 * Emit the event one time.
	 * @returns
	 */
	public setOnce() {
		Reflect.set(this, "once", true);
		return this;
	}

	/**
	 *
	 * Set the event execute function.
	 * @param execute - Event execute function.
	 * @returns
	 */
	public setExecute(execute: EventExecuteFn<K>) {
		this.execute = execute;
		return this;
	}
}
