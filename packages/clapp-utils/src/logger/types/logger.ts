import { TLogFunction } from './common';

export interface ILogger<Levels extends string = string, Tags extends string = string> {
  log: TLogFunction<Levels, Tags>;
}
