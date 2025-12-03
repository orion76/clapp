export interface ILoggerConfig<Names extends string, Levels extends string, Tags extends string = string> {
  name: Names;
  prefix?: string;
  enabled?: boolean;
  tags?: Tags[];
  enabledTags?: Tags[];
  levels: Levels[];
  enabledLevels?: Levels[];
}
