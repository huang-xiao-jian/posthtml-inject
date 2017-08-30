/**
 * @description - lint-staged configuration
 * @author - huang.jian <hjj491229492@hotmail.com>
 */
'use strict';

module.exports = {
  'src/**/*.js': [
    'eslint --fix',
    'git add'
  ],
  '__tests__/**/*.js': [
    'eslint --fix',
    'git add'
  ],
  // Temporary match rule only for working directory
  '*.config.js': [
    'eslint --fix',
    'git add'
  ]
};
