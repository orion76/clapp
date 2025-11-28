import { PluginBase } from '@orion76/plugin';
import { ICommandPluginDefinition, IPluginCommand } from './types/plugin';

export const PLUGIN_COMMAND_TYPE = 'PLUGIN COMMAND';

/**
 * Command plugin instance
 * Handles command registration and execution using the plugin system
 */
export abstract class PluginCommandBase<C = {}> extends PluginBase implements IPluginCommand<C> {
  abstract get definition(): ICommandPluginDefinition<C>;

  abstract action(args: string[], opts: Record<string, unknown>): void | Promise<void | boolean>;

  /**
   * Register command in Commander program
   * @param config Command configuration
   */
}
