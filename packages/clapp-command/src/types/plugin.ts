import { IPlugin, IPluginDefinition, IType } from '@orion76/plugin';
import { ICommandArgument, ICommandOption } from './commander';

export interface ICommandDefintion {
  arguments?: ICommandArgument[];
  options?: ICommandOption[];
  aliases?: string[];
  description: string;
}

export interface IPluginCommandDefinition<C = {}> extends IPluginDefinition {
  config: C;
  command: ICommandDefintion;
  pluginClass: IType<IPluginCommand>;
}

export interface IPluginCommand<C = {}, A = {}> extends IPlugin {
  definition: IPluginCommandDefinition<C>;
  action(args: A): void;
  getArguments(args: string[], opts: Record<string, unknown>): A;
}
