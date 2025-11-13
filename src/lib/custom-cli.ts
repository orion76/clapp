import { Command } from 'commander';

import { IPluginManager } from '@orion76/plugin';
import { IPluginCommand } from './plugins/command/plugin';
import { CommandPluginBuilder } from './plugins/command/plugin-builder';
import { CommandPluginDiscovery } from './plugins/command/plugin-discovery';
import { CommandPluginManager } from './plugins/command/plugin-manager';
import { CLIConfig } from './types/index';

export interface IClapp {
  run(argv?: string[]): void;
}

/**
 * Main class for creating CLI applications
 */
export class Clapp implements IClapp {
  private program: Command;

  private pluginManager: IPluginManager<IPluginCommand>;

  constructor(private config: CLIConfig) {
    this.program = this.createProgram();
    this.pluginManager = this.createPluginManager();
  }

  private createPluginManager() {
    const pluginDiscovery = new CommandPluginDiscovery();
    const pluginBuilder = new CommandPluginBuilder(this.program);

    return new CommandPluginManager(
      pluginDiscovery,
      pluginBuilder,
      this.program
    );
  }

  /**
   * Sets up basic Commander program parameters
   */
  private createProgram(): Command {
    const program = new Command();
    const { name, description, version } = this.config;
    program //
      .name(name)
      .description(description)
      .version(version);

    return program;
  }

  /**
   * Runs command line argument processing
   * @param argv Command line arguments
   */
  public run(argv?: string[]): void {
    this.program.parse(argv);
  }

  /**
   * Creates quick static method for creating and running CLI application
   * @param config Application configuration
   * @param argv Command line arguments
   */
  public static create(config: CLIConfig, argv?: string[]): Clapp {
    const cli = new Clapp(config);
    cli.run(argv);
    return cli;
  }
}
