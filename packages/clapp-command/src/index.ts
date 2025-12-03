/**
 * Types-only exports for command plugins
 * This package contains only TypeScript types and interfaces
 */

// Re-export all types and interfaces
export type { ICommandOption, ICommandArgument } from './types/commander';
export type { IPluginCommand, ICommandDefintion, IPluginCommandDefinition as ICommandPluginDefinition } from './types/plugin';
export { PluginCommandBase, PLUGIN_COMMAND_TYPE } from './plugin.base';
