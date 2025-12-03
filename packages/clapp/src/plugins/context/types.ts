import { IPluginDefinition, IType, IPlugin } from '@orion76/plugin';

export interface IPluginContextDefinition extends IPluginDefinition {
  pluginClass: IType<IPluginContext>;
}

export interface IPluginContext extends IPlugin {
  definition: IPluginContextDefinition;
}
