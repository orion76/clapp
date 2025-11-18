import { ICommandConfig, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';
import { InfoCommandPlugin } from './info.plugin';

/**
 * File information command
 */
const infoCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'info',
  label: 'Get current project information',
  description: 'Get current project information',
  pluginClass:InfoCommandPlugin
};

export default infoCommand;
