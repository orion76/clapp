import { IPackageJson } from '@orion76/clapp-utils';

export type TCommandFindFunction = (fileName: string) => boolean;

export interface IPluginDiscoveryConfig {
  commandsDirectory: string;
  commandFindFunc: TCommandFindFunction;
  isAvailableProjectCheck: (packageJson: IPackageJson) => boolean;
}

/**
 * CLI application configuration
 */
export interface CLIConfig {
  name: string;
  description: string;
  version: string;
  projects: string[];
  commandDiscovery: IPluginDiscoveryConfig;
  contextDiscovery: IPluginDiscoveryConfig;
}

export interface IClapp {
  run(argv?: string[]): void;
}
export interface Type<T> extends Function {
  new (...args: any[]): T;
}
