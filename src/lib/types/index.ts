import { IPluginDefinition } from "@orion76/plugin";
/**
 * Types for describing command options
 */
export interface CommandOption {
  short?: string;
  long: string;
  description: string;
  defaultValue?: string | boolean | number;
  required?: boolean;
  type?: 'string' | 'boolean' | 'number';
}
/**
 * Types for describing command arguments
 */
export interface CommandArgument {
  name: string;
  description: string;
  required?: boolean;
  variadic?: boolean;
}
/**
 * Command execution context
 */
export interface CommandContext {
  args: string[];
  options: Record<string, any>;
}
/**
 * Command handler function type
 */
export type CommandHandler = (context: CommandContext) => Promise<void> | void;
/**
 * Command configuration
 */
export interface ICommandConfig extends IPluginDefinition{
  arguments?: CommandArgument[];
  options?: CommandOption[];
  handler: CommandHandler;
  aliases?: string[];
}
/**
 * CLI application configuration
 */
export interface CLIConfig {
  name: string;
  description: string;
  version: string;
}
/**
 * Command loading result
 */
export interface LoadedCommands {
  commands: ICommandConfig[];
  errors: Array<{
    file: string;
    error: Error;
  }>;
}