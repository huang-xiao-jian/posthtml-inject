/**
 * @description - posthtml plugin for inject elements
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} Insertion
 *
 * @property {string} type
 * @property {object} attrs
 * @property {Array} content
 */

// External
const matcher = require('posthtml-match-helper');
const chalk = require('chalk');

// Scope
const EOL = '\n';

function buildNextTree(elements, name) {
  if (!elements || !Reflect.get(elements, name)) {
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
  const interpolate = insertions.reduce((acc, curr) => [...acc, curr, EOL], []);

  return [EOL, ...interpolate, EOL];
}

/* eslint-disable no-param-reassign */
module.exports = function posthtmlInjectPlugin(options) {
  options = options || {};
  options.slotElementTag = options.slotElementTag || 'posthtml-inject';

  const slot = matcher(`${options.slotElementTag}[name]`);

  return function inject(tree) {
    tree.match(slot, (node) => ({
      tag: false,
      content: buildNextTree(options.elements, node.attrs.name)
    }));

    return tree;
  };
};
