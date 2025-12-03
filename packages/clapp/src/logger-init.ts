import { LoggerCollection } from '@orion76/clapp-utils';
import { ILogger, ILoggerConfig, UConsoleLevels } from '@orion76/clapp-utils/dist/logger/types';

type UNames = 'clapp_cli' | 'command_discovery';

const levels: UConsoleLevels[] = ['info', 'log', 'warn', 'error'];

const clappLoggerConfig: ILoggerConfig<UNames, UConsoleLevels>[] = [
  {
    name: 'clapp_cli',
    enabled: true,
    levels,
    enabledLevels: levels,
  },
  {
    name: 'command_discovery',
    enabled: true,
    levels,
    enabledLevels: levels,
  },
];
const loggerCollections = new LoggerCollection<UNames, UConsoleLevels>(clappLoggerConfig);

export function getLogger(name: UNames): ILogger<UConsoleLevels> {
  return loggerCollections.get(name);
}
