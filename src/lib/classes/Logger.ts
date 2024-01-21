import chalk from "chalk";

export class Logger {
	constructor() {}

	private setPadding(label: string) {
		const maxLength = 6;
		const bar = "-";

		const spacesToAdd = maxLength - label.length;
		if (spacesToAdd <= 0) return bar;

		const spaces = " ".repeat(spacesToAdd);

		return spaces + bar;
	}

	get getTime() {
		return new Date().toLocaleTimeString();
	}

	public info(text: string) {
		const label = "INFO";
		console.log(
			`[${chalk.grey(`${this.getTime}`)}] ✨ [${chalk.cyan(label)}]${this.setPadding(label)} ${text}`,
		);
	}

	public warn(text: string) {
		const label = "WARN";
		console.log(
			`[${chalk.grey(`${this.getTime}`)}] 🥖 [${chalk.yellow(label)}]${this.setPadding(label)} ${text}`,
		);
	}

	public error(text: string) {
		const label = "ERROR";
		console.log(`[${chalk.grey(`${this.getTime}`)}] 🎲 [${chalk.red(label)}]${this.setPadding(label)} ${text}`);
	}
}
