export class InvalidCommand extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidCommand]";
	}
}

export class InvalidComponent extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidComponent]";
	}
}

export class InvalidEvent extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidEvent]";
	}
}

export class InvalidEmbedColor extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidEmbedColor]";
	}
}

export class InvalidVariable extends Error {
	constructor(message: string) {
		super(message);

		this.name = "Lumine [InvalidVariable]";
	}
}
