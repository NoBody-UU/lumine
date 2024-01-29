export { BotConfig } from "./config.js";
export { CommandData, CommandOptions, CommandExecuteFn, AutocompleteFn } from "./commands.js";
export { EventData, EventExecuteFn } from "./events.js";
export { ComponentData, ComponentDataObject, ComponentExecuteFn } from "./components.js";
export { LumineColors } from "./enums.js";

export type Awaitable<T> = T | PromiseLike<T>;
export type RestOrArray<Type> = Type[] | [Type[]];
