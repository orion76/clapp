import { ILoggerCollection, ILoggerConfig, UConsoleLevels } from './types';
import { loggerFactory } from './logger-factory';
import { ILogger } from './types';

export class LoggerCollection<Names extends string, Levels extends UConsoleLevels> implements ILoggerCollection {
  _collection: Map<string, ILogger<Levels>> = new Map();

  _configs: Map<string, ILoggerConfig<Names, Levels>> = new Map();
  constructor(configs: ILoggerConfig<Names, Levels>[]) {
    configs.forEach((c) => this._configs.set(c.name, c));
  }
  private _getConfig(name: string): ILoggerConfig<Names, Levels> {
    if (!this._configs.has(name)) {
      throw new Error(`Logger config is missing: ${name} .`);
    }
    return this._configs.get(name)!;
  }
  get<L extends ILogger>(name: Names): L {
    if (!this._collection.has(name)) {
      const config = this._getConfig(name);
      const logger = loggerFactory(config);
      this._collection.set(name, logger);
    }
    return this._collection.get(name)! as L;
  }
}
