export type TCommandFindFunction = (fileName: string) => boolean;
/**
 * CLI application configuration
 */
export interface CLIConfig {
  name: string;
  description: string;
  version: string;
  projects: string[];
  commandsDirectory: string;
  commandFindFunc: TCommandFindFunction;
}

export interface IClapp {
  run(argv?: string[]): void;
}
export interface Type<T> extends Function {
  new (...args: any[]): T;
}
