import { IPlugin, IPluginDefinition } from '@orion76/plugin';
import { ICommandArgument, ICommandOption } from './commander';
/**
 * Command configuration
 */
export interface ICommandConfig extends IPluginDefinition<IPluginCommand> {
    arguments?: ICommandArgument[];
    options?: ICommandOption[];
    aliases?: string[];
    description: string;
}
export interface IPluginCommand extends IPlugin {
    definition: ICommandConfig;
    action(args: string[], opts: Record<string, unknown>): void;
}
//# sourceMappingURL=plugin.d.ts.map