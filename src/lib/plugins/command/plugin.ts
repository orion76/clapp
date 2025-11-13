import { IPlugin, PluginBase } from '@orion76/plugin';
import { Command } from 'commander';
import { ICommandConfig, CommandContext } from '../../types/index';

export const PLUGIN_COMMAND_TYPE = 'PLUGIN COMMAND';

export interface IPluginCommand extends IPlugin {}

/**
 * Command plugin instance
 * Handles command registration and execution using the plugin system
 */
export class PluginCommand extends PluginBase implements IPluginCommand {
  constructor(
    public definition: ICommandConfig,
    protected program: Command
  ) {
    super();
  }

  /**
   * Register command in Commander program
   * @param config Command configuration
   */
  private async registerCommand(): Promise<void> {
    const config = this.definition;
    const command = this.program.command(config.id);

    // Set description
    command.description(config.label);

    // Add aliases if any
    if (config.aliases && config.aliases.length > 0) {
      command.aliases(config.aliases);
    }

    // Add arguments
    if (config.arguments) {
      for (const arg of config.arguments) {
        const argSyntax = this.buildArgumentSyntax(arg);
        command.argument(argSyntax, arg.description);
      }
    }

    // Add options
    if (config.options) {
      for (const option of config.options) {
        const optionFlags = this.buildOptionFlags(option);
        // Commander accepts only string, boolean or string[] as defaultValue
        let defaultValue = option.defaultValue;
        if (typeof defaultValue === 'number') {
          defaultValue = defaultValue.toString();
        }
        command.option(optionFlags, option.description, defaultValue);
      }
    }

    // Register command handler
    command.action(async (...args: any[]) => {
      // Get correct arguments and options
      const command = args[args.length - 1]; // Command object is always last
      const options = command.opts(); // Get options from Command object
      const commandArgs = args.slice(0, -1); // All except last are arguments

      const context: CommandContext = {
        args: commandArgs,
        options,
      };

      try {
        await config.handler(context);
      } catch (error) {
        console.error(`Error executing command "${config.id}":`, error);
        process.exit(1);
      }
    });
  }

  /**
   * Build argument syntax for Commander
   * @param arg Argument configuration
   * @returns Argument syntax string
   */
  private buildArgumentSyntax(arg: any): string {
    let syntax = arg.name;

    if (arg.variadic) {
      syntax += '...';
    }

    if (!arg.required) {
      syntax = `[${syntax}]`;
    } else {
      syntax = `<${syntax}>`;
    }

    return syntax;
  }

  /**
   * Build option flags for Commander
   * @param option Option configuration
   * @returns Option flags string
   */
  private buildOptionFlags(option: any): string {
    let flags = '';

    if (option.short) {
      flags += `-${option.short}`;
    }

    if (option.long) {
      if (flags) {
        flags += ', ';
      }
      flags += `--${option.long}`;
    }

    // Add value type if not boolean option
    if (option.type !== 'boolean') {
      const valueName = option.long || option.short || 'value';
      if (option.required) {
        flags += ` <${valueName}>`;
      } else {
        flags += ` [${valueName}]`;
      }
    }

    return flags;
  }
}
