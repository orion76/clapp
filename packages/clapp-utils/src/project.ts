import { readFileSync, existsSync } from 'fs';
import { IPackageJson } from './types';
import path from 'path';

export function loadPackageJson(projectRoot: string): IPackageJson | undefined {
  const fullName = path.join(projectRoot, 'package.json');
  if (!existsSync(fullName)) {
    console.error(`package.json not found: ${fullName}`);
    return;
  }
  try {
    return JSON.parse(readFileSync(fullName, 'utf8'));
  } catch (error: any) {
    console.log('[loadPackageJson]', fullName);
  }
}
