import { PluginBuilderBase } from '@orion76/plugin';

import { IPluginCommand, ICommandConfig } from '@orion76/clapp-command';

export class CommandPluginBuilder extends PluginBuilderBase<IPluginCommand> {
  build(definition: ICommandConfig): IPluginCommand {
    const { pluginClass, id } = definition;
    if (!pluginClass) {
      throw new Error(
        `[Command plugin] "pluginClass" for plugin: ${id} is missing.`
      );
    }
    return new pluginClass(definition);
  }
}
