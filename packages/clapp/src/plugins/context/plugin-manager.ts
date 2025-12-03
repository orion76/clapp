import { IPluginBuilder, IPluginDiscovery, PluginManagerBase } from '@orion76/plugin';

import { PLUGIN_CONTEXT_TYPE } from './plugin';
import { IPluginContext, IPluginContextDefinition } from './types';

/**
 * Plugin manager for commands
 * Manages command plugins registration and lifecycle
 */
export class PluginManager extends PluginManagerBase<IPluginContext> {
  type = PLUGIN_CONTEXT_TYPE;

  constructor(
    protected pluginDiscovery: IPluginDiscovery<IPluginContextDefinition>,
    protected pluginBuilder: IPluginBuilder<IPluginContext>
  ) {
    super();
  }
}
