import { execSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

export function getUserProfileDirectory() {
  return os.homedir();
}

export function getCwd(): string {
  return execSync('pwd').toString().trim();
}

function isFsRoot(dir: string): boolean {
  return dir === path.dirname(dir);
}

export function isProjectRoot(dir: string): boolean {
  return fs.existsSync(path.join(dir, 'package.json'));
}

export function getProjectRoot(startFromDir: string, searchInDir = getUserProfileDirectory()) {
  const projectRoot = findProjectRoot(searchInDir, startFromDir, isProjectRoot);
  if (!projectRoot) {
    throw new Error(`Project root not found. \nSearch in: ${searchInDir}\n Search start: ${startFromDir}`);
  }
  return projectRoot;
}

export function findProjectRoot(
  searchInDir: string,
  startFromDir: string,
  checkFn: (dir: string) => boolean
): string | null {
  // Use realpath to resolve symlinks consistently, with fallback for broken symlinks

  let currentDir: string = startFromDir;

  if (!currentDir.startsWith(searchInDir)) {
    throw new Error(`Start directory ${startFromDir} is outside of search directory ${searchInDir}`);
  }

  while (!isFsRoot(currentDir) && currentDir !== searchInDir) {
    if (checkFn(currentDir)) {
      return currentDir;
    }

    // Move up one directory
    currentDir = path.dirname(currentDir);
  }

  // Check the search directory itself as the last step
  if (currentDir === searchInDir && checkFn(currentDir)) {
    return currentDir;
  }

  return null;
}
export function isFileInside(file: string, parentDir: string): boolean {
  // console.log("------", file, { file, parentDir });
  if (!fs.statSync(parentDir).isDirectory()) {
    return false;
  }

  return file.startsWith(parentDir);
}
