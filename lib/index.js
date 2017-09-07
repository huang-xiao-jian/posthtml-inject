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

function buildNextTree(elements, name, EOL, INTENT) {
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
  const interpolate = insertions.slice(0, -1).reduce((acc, curr) => [...acc, curr, `${EOL}${INTENT}`], []);

  return [...interpolate, ...insertions.slice(-1)];
}

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
      const content = match ? buildNextTree(options.elements, Reflect.get(node.attrs, 'data-name'), options.EOL, options.INTENT) : node.content;

      return { tag, attrs, content };
    });

    return tree;
  };
};
