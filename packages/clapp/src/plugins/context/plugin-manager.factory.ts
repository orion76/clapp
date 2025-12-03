import { IPluginDiscoveryConfig } from '../../types';
import { CommandPluginBuilder } from './plugin-builder';
import { PluginDiscovery } from './plugin-discovery/plugin-discovery';
import { PluginManager } from './plugin-manager';

export async function createPluginManager(projects: string[], config: IPluginDiscoveryConfig) {
  const pluginDiscovery = new PluginDiscovery(projects, config);
  await pluginDiscovery.initialize();

  const pluginBuilder = new CommandPluginBuilder();

  return new PluginManager(pluginDiscovery, pluginBuilder);
}
