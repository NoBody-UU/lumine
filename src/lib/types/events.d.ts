import type { Lumine } from "#lumine/client";
import type { ClientEvents } from "oceanic.js";
import type { Awaitable } from "#lumine/types";

interface EventData<K extends keyof ClientEvents> {
	name?: K;
	once?: boolean;
	execute?: EventExecuteFn;
}

export type EventExecuteFn<K> = (client: Lumine, ...args: ClientEvents[K]) => Awaitable<any>;
