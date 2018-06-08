import path from "path";

export function combine(pathA, pathB) {
  if (pathA.endsWith('/')) {
    return pathA + pathB;
  }
  return pathA + '/' + pathB;
}

export function parent(p) {
  return path.dirname(p);
}