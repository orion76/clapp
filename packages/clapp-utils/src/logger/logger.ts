import { ELogLevel, ILogger, ILoggerConfig, TLogFunction, TLoggerTransport, TPropertiesTitles } from './types';
import { noop, printObject } from './utils';

export function loggerFactory(enabled: boolean, name: string, prefix?: string): ILogger {
  return new Logger({ name, enabled, prefix }, console);
}

class Logger implements ILogger {
  private _prefix!: string;

  constructor(
    private config: ILoggerConfig,
    private transport: TLoggerTransport
  ) {
    this.init();
  }

  init() {
    if (this.config.enabled) {
      this.log = this.createLog(ELogLevel.LOG);
      this.warn = this.createLog(ELogLevel.WARN);
      this.error = this.createLog(ELogLevel.ERROR);
    } else {
      this.log = noop;
      this.warn = noop;
      this.error = noop;
    }
  }

  createLog(level: ELogLevel): TLogFunction {
    return (...vars: any[]) => this._log(level, vars);
  }

  log!: TLogFunction;
  warn!: TLogFunction;
  error!: TLogFunction;
  printObject = printObject;

  private _log(level: ELogLevel, vars: any[]) {
    if (!this.config.enabled) {
      return;
    }
    this.transport[level](this.getPrefix(), ...vars);
  }

  private getPrefix() {
    if (!this._prefix) {
      const { prefix, name } = this.config;
      this._prefix = prefix || name;
    }
    return this._prefix;
  }
}
