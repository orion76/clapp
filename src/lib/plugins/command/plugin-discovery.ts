import * as fs from 'fs';
import * as path from 'path';
import { ICommandConfig } from '../../types';

import { PluginDiscoveryBase } from '@orion76/plugin';

import { PLUGIN_COMMAND_TYPE } from './plugin';

/**
 * Plugin discovery for commands
 * Loads command configurations from files and converts them to plugin definitions
 */
export class CommandPluginDiscovery extends PluginDiscoveryBase<ICommandConfig> {
  protected definitions: ICommandConfig[] = [];
  type = PLUGIN_COMMAND_TYPE;

  public discoverPlugins(commandsPath: string): ICommandConfig[] {
    const { definitions } = this;
    const errors: any[] = [];

    try {
      if (!fs.existsSync(commandsPath)) {
        throw new Error(`Commands directory not found: ${commandsPath}`);
      }

      const files = fs.readdirSync(commandsPath);
      const commandFiles = files.filter((file) => file.endsWith('.ts'));

      for (const file of commandFiles) {
        try {
          const config = this.loadCommandFromFile(
            path.join(commandsPath, file)
          );
          if (config) {
            definitions.push(config);
          }
        } catch (error) {
          errors.push({
            file,
            error: error as Error,
          });
        }
      }

      // Log errors if any
      if (errors.length > 0) {
        console.warn('Warnings during command loading:');
        for (const error of errors) {
          console.warn(`  ${error.file}: ${error.error.message}`);
        }
      }
    } catch (error) {
      console.error('Error during plugin discovery:', error);
    }

    return definitions;
  }

  /**
   * Load command configuration from specific file
   * @param filePath Path to command file
   * @returns Command configuration or null
   */
  private loadCommandFromFile(filePath: string): ICommandConfig | null {
    try {
      // Use require for both TypeScript and JavaScript files
      delete require.cache[require.resolve(filePath)];
      const module = require(filePath);
      const config = module.default || module.command || module;

      if (!this.isValidCommandConfig(config)) {
        throw new Error(
          `Invalid command configuration structure in file: ${filePath}`
        );
      }

      return config as ICommandConfig;
    } catch (error) {
      console.error(`Error loading command from ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Validate command configuration correctness
   * @param config Object to validate
   * @returns true if configuration is valid
   */
  private isValidCommandConfig(config: any): boolean {
    return (
      config &&
      typeof config === 'object' &&
      typeof config.name === 'string' &&
      typeof config.description === 'string' &&
      typeof config.handler === 'function'
    );
  }
}
