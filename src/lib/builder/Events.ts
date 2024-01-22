import type { ClientEvents } from "oceanic.js";
import type { Lumine } from "#lumine/client";
import type { Awaitable } from "#lumine/types";

interface EventData<K extends keyof ClientEvents> {
	name: K;
	once?: boolean;
}
export abstract class LumineEvent<K extends keyof ClientEvents> implements EventData<K> {
	readonly name: K;
	readonly once?: boolean;

	constructor(event: EventData<K>) {
		const { name, once } = event;

		this.name = name;
		this.once = once;
	}

	public abstract execute(client: Lumine, ...args: ClientEvents[K]): Awaitable<any>;
}
