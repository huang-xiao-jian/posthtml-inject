/**
 * @description - node-lib-starter
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

'use strict';

/**
 * @description - just example
 *
 * @return {number}
 */
module.exports = function sum() {
  let numbers = Array.from(arguments);

  return numbers.reduce((acc, curr) => acc + curr, 0);
};