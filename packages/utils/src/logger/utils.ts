import { TPropertiesTitles } from './types';

export function noop() {}
export function printObject<O extends {}>(obj: O, title: string, titles: TPropertiesTitles<O>, padding: number = 0) {
  const rows: [string, string][] = Object.entries(titles)
    .filter(([_, title]) => title !== undefined)
    .map(([property, title]) => {
      const value = obj[property as keyof O] as string;
      return [(' '.repeat(padding) + title) as string, value];
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
