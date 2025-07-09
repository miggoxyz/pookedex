import { CommandRegistry } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function getCommands(): CommandRegistry {
  return {
    exit: {
      name: "exit",
      description: "Exits pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Shows list of available commands",
      callback: commandHelp,
    },
  };
}
