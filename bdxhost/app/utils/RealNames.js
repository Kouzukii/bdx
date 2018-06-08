import { readFile } from 'fs';
import yaml from 'js-yaml';
import { Minimatch } from 'minimatch';

let customGlobs = [];
const armorGlobs = [];
let classGlobs = [];

function split(e) {
  return e.split('->');
}

readFile('real_names.yml', 'utf8', (err, data) => {
  if (err) {
    console.log('Failed to find real_names.yml. Did you move it?');
    return;
  }
  try {
    const doc = yaml.safeLoad(data, { schema: yaml.FAILSAFE_SCHEMA });
    customGlobs = doc.mappings.custom
      .map(split)
      .map(g => [new Minimatch(g[0], { nocase: true }), g[1]]);
    doc.mappings.armor.forEach(s => {
      const g = split(s);
      armorGlobs.push([new Minimatch(`/character/**/${g[0]}.pac`), g[1]]);
      armorGlobs.push([
        new Minimatch(`/character/**/${g[0]}_dm.pac`),
        g[1] + ' Damaged'
      ]);
    });
    classGlobs = doc.mappings.class
      .map(split)
      .map(g => [
        new Minimatch('/character/model/1_pc/' + g[0], { nocase: true }),
        g[1]
      ]);
  } catch (e) {
    console.log('Failed to parse real_names.yml. Syntax error maybe?');
  }
});

export function match(path: string) {
  if (path.startsWith('/character/model/1_pc')) {
    return matchClass(path) || matchArmor(path) || matchCustom(path);
  }
  if (path.startsWith('/character/texture')) {
    return matchArmor(path) || matchCustom(path);
  }
  return matchCustom(path);
}

export function matchCustom(path: string) {
  return (customGlobs.find(o => o[0].match(path)) || [])[1];
}

export function matchArmor(path: string) {
  return (armorGlobs.find(o => o[0].match(path)) || [])[1];
}

export function matchClass(path: string) {
  return (classGlobs.find(o => o[0].match(path)) || [])[1];
}
