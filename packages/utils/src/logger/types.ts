export type TPropertiesTitles<O> = {
  [K in keyof O]?: string;
};

export type TLogFunction = (...vars: any[]) => void;

export type TLoggerTransport = {
  [key in ELogLevel]: TLogFunction;
};
export interface ILogger {
  printObject<O extends {}>(obj: O, title: string, titles: TPropertiesTitles<O>, padding?: number): void;
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
