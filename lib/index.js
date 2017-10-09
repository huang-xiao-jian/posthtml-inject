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
const _ = require('lodash');
const matcher = require('posthtml-match-helper');
const chalk = require('chalk');
// Internal
const calcNextTree = require('./calc-next-tree');

/* eslint-disable no-param-reassign */
module.exports = function posthtmlInjectPlugin(options) {
  if (!_.isPlainObject(options) || !_.isPlainObject(options.elements)) {
    throw new Error('posthtml-inject: elements property required');
  }

  options.EOL = options.EOL || '\n';
  options.INTENT = options.INTENT || '  ';
  options.matcher = options.matcher || 'template';
  options.include = options.include || Reflect.ownKeys(options.elements);

  // Match posthtml-inject slot
  const slot = matcher(`${options.matcher}[data-name][data-id="posthtml-inject"]`);

  return function inject(tree) {
    tree.match(slot, (node) => {
      const name = Reflect.get(node.attrs, 'data-name');
      const match = options.include.includes(name);

      // Notify when do nothing onto the slot
      if (!match) {
        /* eslint-disable no-console */
        console.log();
        console.log(chalk.cyan(` posthtml-inject: skip '${name}' slot injection`));
        /* eslint-enable no-console */
      }

      // Preserve specific slot for following step
      const tag = match ? false : node.tag;
      const attrs = match ? {} : node.attrs;
      const content = match ? calcNextTree(options.elements, Reflect.get(node.attrs, 'data-name'), options.EOL, options.INTENT) : node.content;

      return { tag, attrs, content };
    });

    return tree;
  };
};
