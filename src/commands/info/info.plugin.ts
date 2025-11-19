import { PluginCommandBase } from '@orion76/clapp-command';

import fs from 'fs';
import path from 'path';

import { getCwd, getProjectRoot, getUserProfileDirectory, IPackageJson, loggerFactory } from '@orion76/utils';
import { TPropertiesTitles } from '@orion76/utils/dist/logger/types';

const logger = loggerFactory(false, 'command_info', 'Command Info');

export class InfoCommandPlugin extends PluginCommandBase {
  action(args: string[], opts: Record<string, unknown>): void {
    const userProfile = getUserProfileDirectory();
    const cwd = getCwd();

    const projectRoot = getProjectRoot(userProfile, cwd);
    const packageJson: IPackageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

    const titles: TPropertiesTitles<IPackageJson> = {
      name: 'Name',
      version: 'Version',
    };

    logger.printObject(packageJson, 'Project info', titles, 2);
  }
}

function printPackageJson(projectRoot: string) {
  const packageJson: IPackageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

  const titles: TPropertiesTitles<IPackageJson> = {
    name: 'Name',
    version: 'Version',
    scripts: 'Scripts'
  };

  logger.printObject(packageJson, 'Project info', titles, 2);
}
