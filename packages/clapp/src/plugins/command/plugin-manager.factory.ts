import { CLIConfig } from '../../types';
import { CommandPluginBuilder } from './plugin-builder';
import { CommandPluginDiscovery } from './plugin-discovery/plugin-discovery';
import { CommandPluginManager } from './plugin-manager';

export async function createPluginManager(projects: string[], config: CLIConfig) {
  console.log('Initializing plugin manager...',{projects,config});
  const pluginDiscovery = new CommandPluginDiscovery(projects, config);
  await pluginDiscovery.initialize();

  const pluginBuilder = new CommandPluginBuilder();

  return new CommandPluginManager(pluginDiscovery, pluginBuilder);
}
