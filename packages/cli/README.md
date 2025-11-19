# @orion76/clapp

[![npm version](https://img.shields.io/npm/v/@orion76/clapp.svg)](https://www.npmjs.com/package/@orion76/clapp)

The core CLI engine for the `clapp` framework. This package provides a powerful and extensible command-line application framework for Node.js, built with TypeScript, Commander.js, and a dynamic plugin system.

## Features

- **Extensible Plugin System**: Dynamically discovers and loads commands from specified project directories.
- **TypeScript First**: Built entirely in TypeScript with full type support.
- **ESM Native**: Uses modern ES Modules with dynamic `import()` for loading plugins.
- **Commander.js Based**: Leverages the power and flexibility of Commander.js for command parsing.
- **Monorepo Ready**: Designed to work seamlessly in a monorepo environment.

## Installation

This package is intended to be used as part of the `clapp` monorepo, but it can also be installed directly:

```bash
npm install @orion76/clapp @orion76/clapp-command @orion76/utils
```

## Usage

To create your own CLI application using this framework, create an entry point file (e.g., `my-cli.ts`) and configure the `Clapp` instance.

**Example `my-cli.ts`:**

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Get version from your project's package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

// CLI application configuration
const config: CLIConfig = {
  name: 'my-cli',
  description: 'A custom CLI built with @orion76/clapp',
  version: packageJson.version,
  // List of paths where your command plugins are located
  projects: ['/path/to/your/plugins-project'],
  commandsDirectory: 'src/commands',
  commandFindFunc: (fileName: string) =>
    fileName.endsWith('/definition.ts'),
};

// Create and run the CLI application
(async () => {
  try {
    const app = await Clapp.create(config);
    await app.run(process.argv);
  } catch (error) {
    console.error('Application startup error:', error);
    process.exit(1);
  }
})();
```

### Configuration (`CLIConfig`)

- `name`: The name of your CLI application.
- `description`: A short description.
- `version`: The version of your application.
- `projects`: An array of absolute paths to projects containing command plugins.
- `commandsDirectory`: The subdirectory within each project where commands are located (e.g., `src/commands`).
- `commandFindFunc`: A function that returns `true` if a file is a command definition file.

## Making the CLI Executable Globally

To run your CLI application from anywhere in your terminal, you need to make it globally available. This involves two main steps: making the entry script executable and linking it to a directory in your system's `PATH`.

### 1. Add a Shebang to Your Entry File

The first step is to tell the operating system *how* to execute your script. You do this by adding a "shebang" line at the very top of your main entry file (e.g., `my-cli.ts`).

The shebang `#!/usr/bin/env tsx` tells the system to use the `tsx` interpreter to run the file. `tsx` is a tool that allows you to execute TypeScript files directly without pre-compiling them to JavaScript.

Your entry file should look like this:

```typescript
#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
// ... rest of your code
```

**Note:** For the `#!/usr/bin/env tsx` shebang to work, you must have `tsx` installed globally on your system. If you haven't already, you can install it with npm:

```bash
npm install -g tsx
```

After adding the shebang, you need to make the script executable by running the following command in your terminal:

```bash
chmod +x /path/to/your/my-cli.ts
```

### 2. Create a Symbolic Link

Now that your script is executable, you can make it accessible from any directory by creating a symbolic link (symlink) to it in a directory that is part of your system's `PATH`. A common directory for this on macOS and Linux is `/usr/local/bin`.

A symbolic link is like a shortcut to your file.

To create the symlink, use the `ln -s` command. You'll likely need `sudo` for this, as `/usr/local/bin` is a system directory.

```bash
sudo ln -s /path/to/your/my-cli.ts /usr/local/bin/my-cli
```

Let's break down this command:
*   `sudo`: Executes the command with administrator privileges.
*   `ln -s`: The command to create a symbolic link.
*   `/path/to/your/my-cli.ts`: The absolute path to your executable entry script.
*   `/usr/local/bin/my-cli`: The location and name of the link you are creating. This is the command you will type in the terminal.

After completing these steps, you can open a new terminal session and run your application from anywhere by simply typing its new name:

```bash
my-cli --version
my-cli my-command --my-option "hello world"
```

## Plugin Development

A plugin is a self-contained command. The CLI engine discovers plugins by searching for `definition.ts` files within the configured project paths.

A typical plugin structure:

```
my-plugin-project/
└── src/
    ├── commands/
    │   └── my-command/
    │       └── definition.ts  // Command definition
    └── plugins/
        └── my-command-plugin.ts // Plugin logic
```

**Example `definition.ts`:**

```typescript
import { ICommandConfig, PLUGIN_COMMAND_TYPE } from '@orion76/clapp-command';
import { MyCommandPlugin } from '../../plugins/my-command-plugin.js';

const myCommand: ICommandConfig = {
  type: PLUGIN_COMMAND_TYPE,
  id: 'my-command',
  label: 'A short label for my command',
  description: 'This is my custom command',
  pluginClass: MyCommandPlugin,
  options: [
    {
      long: 'my-option',
      description: 'A custom option for the command',
      type: 'string',
      required: true
    }
  ]
};

export default myCommand;
```

## License

MIT

[Русский](./docs/ru/README.md) | [简体中文](./docs/cn/README.md)
