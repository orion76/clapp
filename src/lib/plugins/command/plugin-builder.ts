import { PluginBuilderBase } from '@orion76/plugin';
import { ICommandConfig } from 'lib/types';
import { IPluginCommand, PluginCommand } from './plugin';
import { Command } from 'commander';

export class CommandPluginBuilder extends PluginBuilderBase<IPluginCommand> {
  constructor(private programm: Command) {
    super();
  }
  build(definition: ICommandConfig): IPluginCommand {
    return new PluginCommand(definition, this.programm);
  }
}
