import { IPluginCommand, ICommandPluginDefinition } from '@orion76/clapp-command';
import { PluginBuilderBase } from '@orion76/plugin';



export class CommandPluginBuilder extends PluginBuilderBase<IPluginCommand> {
  build(definition: ICommandPluginDefinition): IPluginCommand {
    const { pluginClass, id } = definition;
    if (!pluginClass) {
      throw new Error(`[Command plugin] "pluginClass" for plugin: ${id} is missing.`);
    }
    return new pluginClass(definition);
  }
}
