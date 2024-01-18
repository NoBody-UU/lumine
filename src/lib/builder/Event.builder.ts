import type { ClientEvents } from "oceanic.js";
import type { Lumine } from "#lumine/client";
import type { Awaitable } from "#lumine/types";

type executeFn<K extends keyof ClientEvents> = (client: Lumine, ...args: ClientEvents[K]) => Awaitable<any>;

export class EventBuilder<K extends keyof ClientEvents> {
	readonly name: K;
	readonly once: boolean = false;
	public execute!: executeFn<K>;

	constructor(eventName: K) {
		this.name = eventName;
	}

	public setOnce(): this {
		Reflect.set(this, "once", true);
		return this;
	}

	public setExecute(fn: executeFn<K>): this {
		this.execute = fn;
		return this;
	}
}
