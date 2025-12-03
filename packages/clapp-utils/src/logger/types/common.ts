import { TPropertiesTitles } from './utils';

export type TLogTransportFunction<Level extends string = string> = (
  level: Level,
  vars: unknown,
  tags?: string[]
) => void;

export type TLogFunction<Levels extends string = string, Tags extends string = string> = (
  vars: unknown,
  level?: Levels,
  tags?: Tags[],
  formatOptions?: ULogFormatOptions
) => void;

export type ULogFormat = 'object';

export interface ILogFormatOptions {
  format: ULogFormat;
}

export interface ILogFormatObject<O = object> extends ILogFormatOptions {
  format: 'object';
  title: string;
  obj: O;
  titles?: TPropertiesTitles<O>;
  padding?: number;
}
export type ULogFormatOptions = ILogFormatObject;
