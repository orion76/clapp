export type TPropertiesTitles<O> = {
  [K in keyof O]?: string;
};

export type TPropertiesFormatFunction<O> = {
  [K in keyof O]?: (property: keyof O, obj: O) => string;
};
export interface IPrintObjectOptions<O> {
  title: string;
  obj: O;
  titles?: TPropertiesTitles<O>;
  padding?: number;
}
