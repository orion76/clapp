import { TPropertiesTitles } from "./types";



export function noop() {}
export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return ''; // Handle empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type TLogValue = string | string[];

type URowTypes = 'one-line' | 'multi-lines';

interface IRowBase {
  type: URowTypes;
  title: string;
}

interface IRowOneLine extends IRowBase {
  type: 'one-line';
  text: TLogValue;
}

interface IRowMultiLines extends IRowBase {
  type: 'multi-lines';
  lines: string[];
}
type URow = IRowOneLine | IRowMultiLines;

export function printObject<O extends {}>(title: string, obj: O, titles?: TPropertiesTitles<O>, padding: number = 0) {
  let _titles: [string, string | undefined][];
  if (titles) {
    _titles = Object.keys(obj).map((key) => [key, titles[key as keyof O]]);
  } else {
    _titles = Object.keys(obj).map((key) => [key, capitalizeFirstLetter(key)]);
  }

  const rows: URow[] = _titles
    .filter(([_, title]) => !!title)
    .map(([property, title]) => {
      const value = obj[property as keyof O] as TLogValue;
      const p = ' '.repeat(padding);
      const rowTitle = `${p}${title}`;

      if (Array.isArray(value)) {
        return {
          type: 'multi-lines',
          title: rowTitle,
          lines: value,
        };
      } else {
        return {
          type: 'one-line',
          title: rowTitle,
          text: value,
        };
      }
    });
  console.log(`\n${title}\n---------------------------------------`);
  printFormattedArray(rows);
  console.log(`---------------------------------------\n`);
}

function printFormattedArray(fields: URow[]) {
  const titlesLength = fields.map(({ title }) => title.length);
  const maxTitleLength = titlesLength.length > 0 ? Math.max(...titlesLength) : 0;

  fields.forEach((field) => {
    const paddedTitle = field.title.padEnd(maxTitleLength);
    if (field.type === 'multi-lines') {
      console.log(`${paddedTitle} :`);
      field.lines.forEach((line) => console.log(`  ${line}`));
    } else {
      console.log(`${paddedTitle} : ${field.text}`);
    }
  });
}
