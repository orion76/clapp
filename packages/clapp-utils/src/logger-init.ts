import { LoggerCollection } from './logger/collection';
import { ILoggerConfig, UConsoleLevels } from './logger/types';


type ULoggerNames = 'clapp_utils';
const clappConfig: ILoggerConfig<ULoggerNames, UConsoleLevels>[] = [
  {
    name: 'clapp_utils',
    enabled: false,
    levels: ['log', 'debug', 'error', 'info', 'warn'],
    enabledLevels: ['log', 'debug', 'error', 'info', 'warn'],
  },
];
const loggerCollections = new LoggerCollection<ULoggerNames, UConsoleLevels>(clappConfig);

export function getLogger(name: ULoggerNames) {
  return loggerCollections.get(name);
}
