import { IPlugin, IPluginDefinition, IType } from '@orion76/plugin';
import { ICommandArgument, ICommandOption } from './commander';

export interface ICommandDefintion {
  arguments?: ICommandArgument[];
  options?: ICommandOption[];
  aliases?: string[];
  description: string;
}

export interface ICommandPluginDefinition<C = {}> extends IPluginDefinition {
  commandConfig: ICommandDefintion & C;
  pluginClass: IType<IPluginCommand>;
}

export interface IPluginCommand<C = {}> extends IPlugin {
  definition: ICommandPluginDefinition<C>;
  action(args: string[], opts: Record<string, string>): void;
}
