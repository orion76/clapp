export type TPropertiesTitles<O> = {
  [K in keyof O]?: string;
};

export type TPropertiesFormatFunction<O> = {
  [K in keyof O]?: (property: keyof O, obj: O) => string;
};

export type TPrintObjectFunction<O> = (obj: O, title: string, titles: TPropertiesTitles<O>, padding?: number) => void;

export type TLogFunction = (...vars: any[]) => void;

export type TLoggerTransport = {
  [key in ELogLevel]: TLogFunction;
};
export interface ILogger {
  printObject<O>: TPrintObjectFunction<O>;
  log: TLogFunction;
  warn: TLogFunction;
  error: TLogFunction;
}

export interface ILoggerConfig {
  name: string;
  prefix?: string;
  enabled?: boolean;
}

export enum ELogLevel {
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
}
