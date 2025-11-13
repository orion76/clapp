import * as fs from 'fs';
import * as path from 'path';
import { ICommandConfig, CommandContext } from '../../lib/types/index';
import { PLUGIN_COMMAND_TYPE } from '@plugin-command';

/**
 * Directory listing command
 */
const listCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'list',
  label: 'Show directory contents',
  aliases: ['ls', 'dir'],
  arguments: [
    {
      name: 'directory',
      description: 'directory path',
      required: false,
    },
  ],
  options: [
    {
      short: 'a',
      long: 'all',
      description: 'show hidden files',
      type: 'boolean',
      defaultValue: false,
    },
    {
      short: 'l',
      long: 'long',
      description: 'detailed output format',
      type: 'boolean',
      defaultValue: false,
    },
  ],
  handler: (context: CommandContext) => {
    const directory = context.args[0] || process.cwd();
    const showHidden = context.options.all || false;
    const longFormat = context.options.long || false;

    try {
      if (!fs.existsSync(directory)) {
        console.error(`Directory not found: ${directory}`);
        return;
      }

      const items = fs.readdirSync(directory);
      const filteredItems = showHidden
        ? items
        : items.filter((item) => !item.startsWith('.'));

      console.log(`Directory contents: ${path.resolve(directory)}`);
      console.log('');

      if (filteredItems.length === 0) {
        console.log('Directory is empty');
        return;
      }

      for (const item of filteredItems) {
        const itemPath = path.join(directory, item);
        const stats = fs.statSync(itemPath);

        if (longFormat) {
          const type = stats.isDirectory() ? 'DIR ' : 'FILE';
          const size = stats.isDirectory() ? '-' : `${stats.size}B`;
          const modified = stats.mtime.toLocaleDateString('en-US');
          console.log(`${type}  ${size.padStart(10)}  ${modified}  ${item}`);
        } else {
          const suffix = stats.isDirectory() ? '/' : '';
          console.log(`${item}${suffix}`);
        }
      }
    } catch (error) {
      console.error(`Error reading directory: ${error}`);
      process.exit(1);
    }
  },
};

export default listCommand;
