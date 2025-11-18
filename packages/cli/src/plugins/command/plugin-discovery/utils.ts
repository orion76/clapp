import { isFileInside } from "@orion76/utils";

export function getStartDirectories(projects: string[]): string[] {
  return getRootDirectoies(projects);
}

function getRootDirectoies(paths: string[]): string[] {
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