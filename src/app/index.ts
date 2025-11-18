#!/usr/bin/env tsx

import { CLIConfig, Clapp } from '@orion76/clapp';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Get version from package.json
const packageJson = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

// CLI application configuration
const config: CLIConfig = {
  name: 'clapp',
  description: 'TypeScript CLI application with Commander and configuration commands system',
  version: packageJson.version,
  projects: ['/home/pasha/www/video-cli'],
  commandsDirectory: 'src/commands',
  commandFindFunc: (fileName: string) =>
    fileName.endsWith('/definition.ts') || fileName.endsWith('.definition.ts'),
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
