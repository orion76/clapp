import { PluginDiscoveryBase } from '@orion76/plugin';
import * as fs from 'fs';
import * as path from 'path';

import { ICommandConfig, PLUGIN_COMMAND_TYPE, TCommandFindFunction } from '@orion76/clapp-command';
import { getProjectRoot, getUserProfileDirectory, isFileInside, isString, loggerFactory } from '@orion76/utils';
import { getStartDirectories } from './utils';


const logger = loggerFactory(false, 'command_plugin_discovery', 'Command Discovery');

/**
 * Plugin discovery for commands
 * Loads command configurations from files and converts them to plugin definitions
 */
export class CommandPluginDiscovery extends PluginDiscoveryBase<ICommandConfig> {
  type = PLUGIN_COMMAND_TYPE;
  protected definitions: ICommandConfig[] = [];

  constructor(
    private projects: string[],
    private directory: string,
    private findFileFunc: TCommandFindFunction
  ) {
    super();
    // Don't load definitions in constructor anymore
  }

  async initialize(): Promise<void> {
    this.definitions = await this.findDefinitions();
  }

  async findDefinitions(): Promise<ICommandConfig[]> {
    const definitionFiles = this.findDefinitionFileNames();
    logger.log('++ [CLAPP] commands\n', definitionFiles.join('\n'));
    
    // Load all definitions asynchronously
    const configPromises = definitionFiles.map(filePath => 
      this.loadCommandFromFile(filePath)
    );
    
    const configs = await Promise.all(configPromises);
    
    // Filter out null results
    const validConfigs = configs.filter((config): config is ICommandConfig => {
      if (!config) {
        logger.error('Failed to load some command definitions');
        return false;
      }
      return true;
    });

    if (validConfigs.length !== configs.length) {
      throw new Error('Some command definitions failed to load');
    }

    return validConfigs;
  }

  /**
   * Load command configuration from specific file using dynamic import
   * @param filePath Path to command file
   * @returns Command configuration or null
   */
  private async loadCommandFromFile(filePath: string): Promise<ICommandConfig | null> {
    try {
      console.log(`[DEBUG] Loading ESM module: ${filePath}`);
      
      // Convert to file URL for dynamic import
      const fileUrl = `file://${filePath}`;
      
      // Use dynamic import for ESM modules
      const module = await import(fileUrl);
      const config: ICommandConfig = module.default || module;

      console.log(`[DEBUG] Config loaded:`, config);

      const valid = this.isValidCommandConfig(config);
      if (valid.errors.length > 0) {
        throw new Error(`${valid.errors.join('\n')}`);
      }

      return config;
    } catch (error) {
      console.error(`[ERROR] Error loading command from ${filePath}:`, (error as Error).message);
      console.error(`[ERROR] Stack:`, (error as Error).stack);
      return null;
    }
  }

  getCommandPaths(commandsDirectory: string): string[] {
    const searchDir = getUserProfileDirectory();
    const startDirectories = getStartDirectories(this.projects);
    logger.log('++ [CLAPP] =============');
    logger.log('  ', 'projects', this.projects);
    logger.log('  ', 'searcjDir', searchDir);
    logger.log('  ', 'startDirectories', startDirectories);

    const commandPaths = startDirectories
      .map((startDirectory) => {
        const projectRoot = getProjectRoot(searchDir, startDirectory);
        const commandPath = path.join(projectRoot, commandsDirectory);
        if (!fs.existsSync(commandPath)) {
          logger.warn('Command path not found:' + commandPath);
          return;
        }
        return commandPath;
      })
      .filter(isString);
    logger.log('  ', 'COMMANDS', commandPaths);
    return commandPaths;
  }

  findDefinitionFileNames(): string[] {
    const definitionPaths: string[] = [];
    const commandPaths = this.getCommandPaths(this.directory);

    commandPaths.forEach((commandPath) => {
      const fileNames = fs.readdirSync(commandPath, { encoding: 'utf8', recursive: true }).filter(this.findFileFunc);
      const fullPaths = fileNames.map((fileName) => path.join(commandPath, fileName));
      definitionPaths.push(...fullPaths);
    });

    return definitionPaths;
  }

  configSchema = {
    id: 'string',
    label: 'string',
    description: 'string',
    pluginClass: 'function',
  };

  /**
   * Validate command configuration correctness
   * @param config Object to validate
   * @returns true if configuration is valid
   */
  private isValidCommandConfig(config: ICommandConfig): { errors: string[] } {
    let errors: string[] = [];
    if (!config || typeof config !== 'object') {
      errors.push('[Command config]', 'Command config is not object:' + JSON.stringify(config));

      return { errors };
    }

    Object.entries(this.configSchema).forEach(([prop, propType]) => {
      const value = config[prop as keyof ICommandConfig];
      if (!value) {
        errors.push(`Config property is missing: "${prop}"`);
      } else if (typeof config[prop as keyof ICommandConfig] !== propType) {
        const _propType = typeof config[prop as keyof ICommandConfig];
        errors.push(`Config property type is failure: "${prop}:"${_propType}" expected "${propType}"`);
      }
    });

    return { errors };
  }
}
