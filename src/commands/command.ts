export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: CommandRegistry) => void;
};

export type CommandRegistry = Record<string, CLICommand>;
