import { TCommandFindFunction } from '@orion76/clapp-command';
import { CommandPluginBuilder } from './plugin-builder';
import { CommandPluginDiscovery } from './plugin-discovery/plugin-discovery';
import { CommandPluginManager } from './plugin-manager';

export async function createPluginManager(projects: string[], commandsDirectory: string, commandFindFunc: TCommandFindFunction) {
  const pluginDiscovery = new CommandPluginDiscovery(projects, commandsDirectory, commandFindFunc);
  
  // Initialize the discovery asynchronously
  await pluginDiscovery.initialize();

  const pluginBuilder = new CommandPluginBuilder();

  return new CommandPluginManager(pluginDiscovery, pluginBuilder);
}
