import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";

import type { CLICommand } from "./state.js";
import { commandMapNext, commandMapPrev } from "./command_map.js";
import { commandExplore } from "./command_explore.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Get next page of location areas",
      callback: commandMapNext,
    },
    mapb: {
      name: "mapb",
      description: "Get previous page of location areas",
      callback: commandMapPrev,
    },
    explore: {
      name: "explore",
      description: "Explore location area by name",
      callback: commandExplore,
    },
  };
}
