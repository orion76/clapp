import { PLUGIN_COMMAND_TYPE } from '@plugin-command';
import { ICommandConfig, CommandContext } from '../../lib/types/index';

/**
 * User greeting command
 */
const helloCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'hello',
  label: 'Greet user',
  options: [
    {
      short: 'n',
      long: 'name',
      description: 'user name',
      defaultValue: 'World',
      type: 'string',
    },
  ],
  handler: (context: CommandContext) => {
    const name = context.options.name || 'World';
    console.log(`Hello, ${name}!`);
  },
};

export default helloCommand;
