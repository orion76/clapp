import { ConsoleLogFunc, ILoggerTransport, UConsoleLevels } from '../types';

export class ConsoleTransport implements ILoggerTransport {
  send(level: string, vars: unknown) {
    const method: UConsoleLevels = console[level as UConsoleLevels] ? (level as UConsoleLevels) : 'log';
    const args = Array.isArray(vars) ? vars : [vars];
    (console[method] as ConsoleLogFunc)(...args);
  }
}
