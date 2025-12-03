import { ILogger } from './logger';

export interface ILoggerCollection {
  get(name: string):ILogger;
}
