import { ICommandPluginDefinition, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';
import { InfoCommandPlugin } from './info.plugin';

/**
 * File information command
 */
const infoCommand: ICommandPluginDefinition = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'info',
  label: 'Get current project information',

  commandDefinition: { description: 'Get current project information' },
  pluginClass: InfoCommandPlugin,
};

export default infoCommand;
