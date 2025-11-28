import { TPropertiesTitles } from './types';

export function noop() {}
export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return ''; // Handle empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function printObject<O extends {}>(title: string, obj: O, titles?: TPropertiesTitles<O>, padding: number = 0) {
  let _titles: [string, string][];
  if (titles) {
    _titles = Object.entries(obj);
  } else {
    _titles = Object.keys(obj).map((key) => [key, capitalizeFirstLetter(key)]);
  }

  const rows: [string, string][] = _titles
    .filter(([_, title]) => title !== undefined)
    .map(([property, title]) => {
      const value = obj[property as keyof O];
      const p = ' '.repeat(padding);
      if (Array.isArray(value)) {
        // const output: string[] = value.map((str) => ` ${p}- ${str}`);
        const output: string[] = [];
        return [`${p}${title}:\n`, output.join('\n')];
      } else {
        return [(p + title) as string, value as string];
      }
    });
  console.log(`\n${title}\n---------------------------------------`);
  printFormattedArray(rows);
  console.log(`---------------------------------------\n`);
}

function printFormattedArray(fields: [string, string][]) {
  const maxTitleLength = Math.max(...fields.map(([title]) => title.length));

  fields.forEach(([title, value]) => {
    const paddedTitle = title.padEnd(maxTitleLength);
    console.log(`${paddedTitle} : ${value}`);
  });
}
