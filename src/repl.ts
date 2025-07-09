import { createInterface } from "readline";
import { getCommands } from "./commands/commands.js";

// split input into words, based on whitespace, lowercase input, trim leading or trailing whitespace
export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((w) => w !== "");
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (input) => {
    const i = cleanInput(input);
    if (i.length === 0) {
      rl.prompt();
    }
    const commandName = i[0];
    const commands = getCommands();
    const cmd = commands[commandName];
    if (!cmd) {
      console.log(
        `Unknown command: "${commandName}". Type "help" for a list of commands.`
      );
      rl.prompt();
      return;
    }
    try {
      cmd.callback(commands);
    } catch (e) {
      console.log(e);
    }
    rl.prompt();
  });
}
