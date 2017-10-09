/**
 * @description - calculate raw options into posthtml AST
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// External
const chalk = require('chalk');

module.exports = function calcNextTree(elements, name, EOL, INTENT) {
  if (!Reflect.get(elements, name)) {
    // eslint-disable-next-line no-console
    console.log(chalk.cyan(`posthtml-inject: Don't forget to add elements to insert into --> ${name}`));

    return [];
  }

  if (!Array.isArray(Reflect.get(elements, name))) {
    // eslint-disable-next-line no-console
    console.log(chalk.cyan(` posthtml-inject: Don't mistake element syntax`));

    return [];
  }

  // Add EOL for element item
  const insertions = Reflect.get(elements, name);
  const interpolate = insertions.slice(0, -1).reduce((acc, curr) => [...acc, curr, `${EOL}${INTENT}`], []);

  return [...interpolate, ...insertions.slice(-1)];
};
