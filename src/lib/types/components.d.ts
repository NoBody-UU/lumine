import type { Lumine } from "#lumine/client";
import type { Awaitable } from "#lumine/types";
import type {
	AnyComponentButtonInteraction,
	AnyComponentSelectMenuInteraction,
	AnyModalSubmitInteraction,
	ComponentInteraction,
	ComponentTypes,
	ModalSubmitInteraction,
	SelectMenuTypes,
} from "oceanic.js";

export interface ComponentDataObject {
	customId: string;
	type: ComponentTypes;
}

interface ComponentInteractions {
	1: never;
	2: ComponentInteraction<ComponentTypes.BUTTON>;
	3: ComponentInteraction<ComponentTypes.STRING_SELECT>;
	4: ModalSubmitInteraction;
	5: ComponentInteraction<ComponentTypes.USER_SELECT>;
	6: ComponentInteraction<ComponentTypes.ROLE_SELECT>;
	7: ComponentInteraction<ComponentTypes.MENTIONABLE_SELECT>;
	8: ComponentInteraction<ComponentTypes.CHANNEL_SELECT>;
}

export interface ComponentData<K> {
	/** The component data. */
	data: Partial<ComponentDataObject>;
	/** The component execute. */
	execute?: ComponentExecuteFn<K>;
}

export type ComponentExecuteFn<K> = (client: Lumine, interaction: ComponentInteraction<K>) => Awaitable<any>;
