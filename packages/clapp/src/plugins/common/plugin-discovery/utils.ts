import { isFileInside } from '@orion76/clapp-utils';

export function getStartDirectories(projects: string[]): string[] {
  return getRootDirectoies(projects);
}
function getRootDirectoies(paths: string[]): string[] {
  if (paths.length <= 1) {
    return paths;
  }

  const uniquePaths = [...new Set(paths)];

  const rootPaths = uniquePaths.filter((path1) => {
    return !uniquePaths.some((path2) => {
      return path1 !== path2 && isFileInside(path2, path1);
    });
  });

  return rootPaths;
}
function _getRootDirectoies(paths: string[]): string[] {
  let root: string[] = [];
  paths.forEach((p1) => {
    paths.forEach((p2) => {
      if (isFileInside(p1, p2)) {
        root.push(p2);
        return;
      }
      if (isFileInside(p2, p1)) {
        root.push(p1);
        return;
      }
    });
  });
  if (paths.length > root.length) {
    return getRootDirectoies(root);
  } else {
    return root;
  }
}
