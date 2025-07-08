// split input into words, based on whitespace, lowercase input, trim leading or trailing whitespace
export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(" ")
    .filter((w) => w !== "");
}
