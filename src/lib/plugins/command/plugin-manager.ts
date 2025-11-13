import {
  IPluginBuilder,
  IPluginDiscovery,
  PluginManagerBase
} from '@orion76/plugin';
import { Command } from 'commander';
import { ICommandConfig } from 'lib/types';
import {
  IPluginCommand,
  PLUGIN_COMMAND_TYPE,
  PluginCommand,
} from './plugin';

/**
 * Plugin manager for commands
 * Manages command plugins registration and lifecycle
 */
export class CommandPluginManager extends PluginManagerBase<IPluginCommand> {
  type = PLUGIN_COMMAND_TYPE;
  private plugins: Map<string, PluginCommand> = new Map();

  constructor(
    protected pluginDiscovery: IPluginDiscovery<ICommandConfig>,
    protected pluginBuilder: IPluginBuilder<IPluginCommand>,

    private program: Command
  ) {
    super();
  }

  /**
   * Register plugins from definitions
   * @param definitions Array of plugin definitions
   */
  public async registerPlugins(definitions: ICommandConfig[]): Promise<void> {
    for (const definition of definitions) {
      try {
        await this.registerPlugin(definition);
      } catch (error) {
        console.error(`Error registering plugin "${definition.id}":`, error);
      }
    }
  }

  /**
   * Register single plugin
   * @param definition Plugin definition
   */
  public async registerPlugin(definition: ICommandConfig): Promise<void> {
    try {
      // Create plugin instance
      const plugin = new PluginCommand(definition, this.program);

      // Initialize plugin
      // await plugin.initialize();

      // Add to plugin registry
      this.addPlugin(definition.id, plugin);
    } catch (error) {
      console.error(`Failed to register plugin ${definition.id}:`, error);
      throw error;
    }
  }

  /**
   * Add plugin to registry
   * @param id Plugin ID
   * @param plugin Plugin instance
   */
  public addPlugin(id: string, plugin: PluginCommand): void {
    this.plugins.set(id, plugin);
  }

  /**
   * Get plugin by ID
   * @param id Plugin ID
   * @returns Plugin instance or undefined
   */
  public getPlugin(id: string): PluginCommand | undefined {
    return this.plugins.get(id);
  }

  /**
   * Get all plugin IDs
   * @returns Array of plugin IDs
   */
  public getPluginIds(): string[] {
    return Array.from(this.plugins.keys());
  }

  /**
   * Get Commander program instance
   * @returns Commander program
   */
  public getProgram(): Command {
    return this.program;
  }

  /**
   * Get loaded plugins count
   * @returns Number of loaded plugins
   */
  public getPluginCount(): number {
    return this.getPluginIds().length;
  }

  /**
   * Get all registered plugin names
   * @returns Array of plugin names
   */
  public getPluginNames(): string[] {
    return this.getPluginIds();
  }
}
