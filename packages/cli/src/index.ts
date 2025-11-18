/**
 * CLI library exports
 * This package provides the full CLI implementation
 */

// Export main CLI class
export { Clapp } from './custom-cli';

// Export plugin system (needed for CLI to work)
export * from './plugins/command';

// Export types (from the types package, but re-exported for convenience)
export type {
  TCommandFindFunction,
  CLIConfig,
  IClapp,
  Type,
  ICommandOption,
  ICommandArgument,
  ICommandConfig,
  IPluginCommand,
} from '@orion76/clapp-command';