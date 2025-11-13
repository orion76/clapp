import * as fs from 'fs';
import {
  PLUGIN_COMMAND_TYPE,
  ICommandConfig,
  CommandContext,
} from '@plugin-command';

/**
 * File creation command
 */
const createFileCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'create-file',
  label: 'Create new file',
  arguments: [
    {
      name: 'filename',
      description: 'file name',
      required: true,
    },
  ],
  options: [
    {
      short: 'c',
      long: 'content',
      description: 'file content',
      defaultValue: 'Hello from CLI!',
      type: 'string',
    },
  ],
  handler: (context: CommandContext) => {
    const filename = context.args[0];
    const content = context.options.content || 'Hello from CLI!';

    try {
      fs.writeFileSync(filename, content, 'utf8');
      console.log(`File '${filename}' created successfully!`);
    } catch (error) {
      console.error(`Error creating file: ${error}`);
      process.exit(1);
    }
  },
};

export default createFileCommand;
