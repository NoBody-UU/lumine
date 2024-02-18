//@ts-check
import "dotenv/config"
import { config }  from "seyfert";

if (!process.env.TOKEN) throw new Error("No token provided >:|");

export default config.bot({
    intents: 123,
    token: process.env.TOKEN,
    locations: {
      base: "src",
      output: "build",
      commands: "commands",
    }
});