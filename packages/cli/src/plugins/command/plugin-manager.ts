import {
  IPluginBuilder,
  IPluginDiscovery,
  PluginManagerBase,
} from '@orion76/plugin';

import { PLUGIN_COMMAND_TYPE, IPluginCommand, ICommandConfig } from '@orion76/clapp-command';

/**
 * Plugin manager for commands
 * Manages command plugins registration and lifecycle
 */
export class CommandPluginManager extends PluginManagerBase<IPluginCommand> {
  type = PLUGIN_COMMAND_TYPE;

  constructor(
    protected pluginDiscovery: IPluginDiscovery<ICommandConfig>,
    protected pluginBuilder: IPluginBuilder<IPluginCommand>
  ) {
    super();
  }
}
