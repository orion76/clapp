import { PluginBase } from '@orion76/plugin';
import { IPluginCommand, IPluginCommandDefinition } from './types/plugin';


export const PLUGIN_COMMAND_TYPE = 'PLUGIN COMMAND';

/**
 * Command plugin instance
 * Handles command registration and execution using the plugin system
 */
export abstract class PluginCommandBase<C = {}, A = {}> extends PluginBase implements IPluginCommand<C, A> {
  abstract get definition(): IPluginCommandDefinition<C>;

  abstract action(args: A): void | Promise<void | boolean>;

  getArguments<O extends object>(args: string[], opts: O): A {
    const _args = { ...opts } as Record<string, any>;
    args.forEach((a) => (_args[a] = true));
    return _args as A;
  }
}
