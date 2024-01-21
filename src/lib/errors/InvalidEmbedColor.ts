export class InvalidEmbedColor extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidEmbedColor]";
	}
}
