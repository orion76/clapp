#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { Clapp } from './lib';

// Get version from package.json
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);

// CLI application configuration
const config = {
  name: 'clapp',
  description:
    'TypeScript CLI application with Commander and configuration commands system',
  version: packageJson.version,
  commandsPath: path.join(__dirname, '../commands'),
};

// Create and run CLI application with plugin system
try {
  Clapp.create(config, process.argv);
} catch (error) {
  console.error('Application startup error:', error);
  process.exit(1);
}
