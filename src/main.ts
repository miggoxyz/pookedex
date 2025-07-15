import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  const state = initState(1000 * 60 * 2); //2 minutes
  await startREPL(state);
}

main();
