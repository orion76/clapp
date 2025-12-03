import { Logger } from './logger';
import { ConsoleTransport } from './transports/console.transport';
import { ILogger, ILoggerConfig, UConsoleLevels } from './types';
import { noop } from './utils';

export function loggerFactory<Names extends string, Levels extends UConsoleLevels, Tags extends string>(
  config: ILoggerConfig<Names, Levels, Tags>
): ILogger<Levels, Tags> {
  const { enabled } = config;

  const transport = new ConsoleTransport();
  const logger = new Logger(config, transport);

  if (!enabled) {
    logger.log = noop;
    return logger;
  }

  return logger;
}
