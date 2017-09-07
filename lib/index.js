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
  options = options || {};
  options.EOL = options.EOL || '\n';
  options.INTENT = options.INTENT || '  ';
  options.exclude = options.exclude || [];

  // Match posthtml-inject slot
  const slot = matcher(`template[data-name][data-id="posthtml-inject"]`);

  return function inject(tree) {
    tree.match(slot, (node) => {
      const name = Reflect.get(node.attrs, 'data-name');
      const preserve = options.exclude.includes(name);
      // Preserve specific slot for following step
      const tag = preserve ? node.tag : false;
      const content = preserve ? node.content : buildNextTree(options.elements, Reflect.get(node.attrs, 'data-name'), options.EOL, options.INTENT);
      const attrs = preserve ? node.attrs : {};

      return { tag, attrs, content };
    });

    return tree;
  };
};
