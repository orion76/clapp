import * as fs from 'fs';
import { ICommandConfig, CommandContext } from '../../lib/types/index';
import { PLUGIN_COMMAND_TYPE } from '@plugin-command';

/**
 * File information command
 */
const infoCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'info',
  label: 'Get file information',
  aliases: ['file-info', 'stat'],
  arguments: [
    {
      name: 'filepath',
      description: 'file path',
      required: true,
    },
  ],
  handler: async (context: CommandContext) => {
    const filepath = context.args[0];

    try {
      const stats = fs.statSync(filepath);
      console.log(`File information: ${filepath}`);
      console.log(`Size: ${stats.size} bytes`);
      console.log(`Created: ${stats.birthtime.toLocaleString('en-US')}`);
      console.log(`Modified: ${stats.mtime.toLocaleString('en-US')}`);
      console.log(`Type: ${stats.isDirectory() ? 'Directory' : 'File'}`);
    } catch (error) {
      console.error(`Error getting file information: ${error}`);
      process.exit(1);
    }
  },
};

export default infoCommand;
