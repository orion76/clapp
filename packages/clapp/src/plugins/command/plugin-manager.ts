import { IPluginBuilder, IPluginDiscovery, PluginManagerBase } from '@orion76/plugin';

import { ICommandPluginDefinition, IPluginCommand, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';

/**
 * Plugin manager for commands
 * Manages command plugins registration and lifecycle
 */
export class CommandPluginManager extends PluginManagerBase<IPluginCommand> {
  type = PLUGIN_COMMAND_TYPE;

  constructor(
    protected pluginDiscovery: IPluginDiscovery<ICommandPluginDefinition>,
    protected pluginBuilder: IPluginBuilder<IPluginCommand>
  ) {
    super();
  }
}
