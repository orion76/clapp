#!/usr/bin/env tsx

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Clapp, CLIConfig } from '@orion76/clapp';
import { getProjectRoot, IPackageJson, loadPackageJson } from '@orion76/clapp-utils';

// Get current directory in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Get version from package.json
// const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));
const projectRoot = getProjectRoot(__dirname);
const packageJson = loadPackageJson(join(__dirname, '../../package.json'));

// CLI application configuration
const config: CLIConfig = {
  name: 'clapp',
  description: 'TypeScript CLI application with Commander and configuration commands system',
  version: packageJson ? packageJson.version : '-',
  projects: ['/home/pasha/www/video-cli'],
  commandDiscovery: {
    commandsDirectory: 'src/commands',
    commandFindFunc: (fileName: string) => fileName.endsWith('/definition.ts') || fileName.endsWith('.definition.ts'),
    isAvailableProjectCheck: (packageJson: IPackageJson): boolean => packageJson.name === 'vutlan',
  },
  contextDiscovery: {
    commandsDirectory: 'src/commands',
    commandFindFunc: (fileName: string) => fileName.endsWith('/definition.ts') || fileName.endsWith('.definition.ts'),
    isAvailableProjectCheck: (packageJson: IPackageJson): boolean => packageJson.name === 'vutlan',
  },
};

// Create and run CLI application with plugin system
(async () => {
  try {
    const app = await Clapp.create(config);
    app.run(process.argv);
  } catch (error) {
    console.error('Application startup error:', error);
    process.exit(1);
  }
})();
