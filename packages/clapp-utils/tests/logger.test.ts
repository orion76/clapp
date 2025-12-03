import { loggerFactory } from '../src/logger/logger-factory';
import { ILoggerConfig, ULoggerLevels } from '../src/logger/types';

type UNames = 'test-logger';

describe('Logger', () => {
  it('should create a logger with default levels', () => {
    const loggerConfig: ILoggerConfig<ULoggerLevels, UNames> = {
      name: 'test-logger',
      enabled: true,
    };
    const logger = loggerFactory(loggerConfig);
    expect(logger).toBeDefined();
    expect(typeof logger.log).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('should log messages when enabled', () => {
    const loggerConfig: ILoggerConfig<ULoggerLevels, UNames> = {
      name: 'test-logger',
      enabled: true,
    };
    const logger = loggerFactory(loggerConfig);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('Test message');
    expect(consoleSpy).toHaveBeenCalledWith('[test-logger]', 'Test message');
    consoleSpy.mockRestore();
  });

  it('should not log when disabled', () => {
    const loggerConfig: ILoggerConfig<ULoggerLevels, UNames> = {
      name: 'test-logger',
      enabled: false,
    };
    const logger = loggerFactory(loggerConfig);
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.log('Test message');
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
