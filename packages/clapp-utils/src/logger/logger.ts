import {
  ILogger,
  ILoggerConfig,
  ILoggerTransport,
  UConsoleLevels,
  ULogFormatOptions,
} from './types';

export class Logger<Names extends string, Levels extends UConsoleLevels, Tags extends string>
  implements ILogger<Levels, Tags>
{
  private _prefix!: string;
  // Dynamically add log level methods

  constructor(
    private config: ILoggerConfig<Names, Levels, Tags>,
    private transport: ILoggerTransport
  ) {}

  log(vars: unknown, level?: Levels, tags?: Tags[], formatOptions?: ULogFormatOptions) {
    const _level = level || 'log';
    const prefix = this.formatPrefix(this.getPrefix());
    const _vars = [prefix, ...(Array.isArray(vars) ? vars : [vars])];
    this.transport.send(_level, _vars, tags);
  }

  format(vars: unknown, options: ULogFormatOptions) {

  }

  formatPrefix(prefix: string) {
    return `[${prefix}]`;
  }

  private getPrefix() {
    if (!this._prefix) {
      const { prefix, name } = this.config;
      this._prefix = prefix || name;
    }
    return this._prefix;
  }
}
