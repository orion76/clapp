import { TLogTransportFunction } from './common';

export type UConsoleLevels = 'log' | 'info' | 'warn' | 'error' | 'debug';

export type ConsoleLogFunc = (...args: any[]) => void;

export interface ILoggerTransport {
  send: TLogTransportFunction;
}
