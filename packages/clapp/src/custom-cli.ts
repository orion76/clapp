import { Command } from 'commander';

import {
  ICommandArgument,
  ICommandDefintion,
  ICommandOption,
  IPluginCommand
} from '@orion76/clapp-command';
import { loggerFactory } from '@orion76/clapp-utils';
import { IPluginManager } from '@orion76/plugin';
import { createPluginManager } from './plugins/command';
import { CLIConfig, IClapp } from './types';


const logger = loggerFactory(false, 'Clapp CLI');
/**
 * Main class for creating CLI applications
 */
export class Clapp implements IClapp {
  private program: Command;

  private pluginManager!: IPluginManager<IPluginCommand>;

  constructor(private config: CLIConfig) {
    logger.log('--- Creating CLI application:', config.name);
    this.program = this.createProgram();
  }

  /**
   * Initialize the CLI application asynchronously
   */
  async initialize(): Promise<void> {
    const { commandsDirectory, commandFindFunc } = this.config;
    this.pluginManager = await createPluginManager(this.config.projects, this.config);
    this.createCommands();
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
  public async run(argv?: string[]): Promise<void> {
    await this.program.parseAsync(argv);
  }

  /**
   * Creates quick static method for creating and running CLI application
   * @param config Application configuration
   * @returns Promise that resolves to initialized CLI instance
   */
  public static async create(config: CLIConfig): Promise<Clapp> {
    const cli = new Clapp(config);
    await cli.initialize();
    return cli;
  }

  private createCommand(name: string, config: ICommandDefintion) {
    logger.log('[CLAPP] createCommand', name);
    const command = this.program.command(name);
    command.description(config.description);

    if (config.aliases && config.aliases.length > 0) {
      command.aliases(config.aliases);
    }

    // Add arguments
    if (config.arguments) {
      for (const arg of config.arguments) {
        const argSyntax = this.buildCommandArgument(arg);
        command.argument(argSyntax, arg.description);
      }
    }

    // Add options
    if (config.options) {
      for (const option of config.options) {
        const optionFlags = this.buildCommandOption(option);
        logger.log('[CLAPP] option:', optionFlags);
        let defaultValue = option.defaultValue;
        if (typeof defaultValue === 'number') {
          defaultValue = defaultValue.toString();
        }
        if (option.required) {
          command.requiredOption(optionFlags, option.description, defaultValue);
        } else {
          command.option(optionFlags, option.description, defaultValue);
        }
      }
    }

    return command;
  }

  createCommands() {
    const commands = this.pluginManager.getDefinitions();
    commands.forEach(({ id, commandConfig }) => {
      const command = this.createCommand(id, commandConfig);
      command.action(async (...allArgs: any[]) => {
        try {
          const { name, args, opts } = this.parseCommandArgs(allArgs);
          const plugin = this.pluginManager.getInstance(name);

          const result: any = plugin.action(args, opts);
          if (result && typeof result.then === 'function') {
            await result;
          }
          process.exit(0);
        } catch (error) {
          logger.error('Command execution error:', error);
          process.exit(1);
        }
      });
    });
  }

  parseCommandArgs(allArgs: any[]) {
    const command = allArgs[allArgs.length - 1]; // Command object is always last
    const opts = command.opts(); // Get options from Command object
    const args = allArgs.slice(0, -1); // All except last are arguments
    return { name: command.name(), args, opts };
  }

  /**
   * Build argument syntax for Commander
   * @param arg Argument configuration
   * @returns Argument syntax string
   */
  private buildCommandArgument(arg: ICommandArgument): string {
    let commandArgument = arg.name;

    if (arg.variadic) {
      commandArgument += '...';
    }
    commandArgument = arg.required ? `<${commandArgument}>` : `[${commandArgument}]`;

    return commandArgument;
  }

  /**
   * Build option flags for Commander
   * @param option Option configuration
   * @returns Option flags string
   */
  private buildCommandOption(option: ICommandOption): string {
    let flags: string[] = [];

    if (option.short) {
      flags.push(`-${option.short}`);
    }

    if (option.name) {
      if (flags.length > 0) {
        flags.push(', ');
      }
      flags.push(`--${option.name}`);
    }

    if (option.type !== 'boolean') {
      const valueName = option.name || option.short || 'value';
      if (option.required) {
        flags.push(` <${valueName}>`);
      } else {
        flags.push(` [${valueName}]`);
      }
    }

    return flags.join('');
  }
}
