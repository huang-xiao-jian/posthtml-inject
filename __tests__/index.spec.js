/**
 * @description - main test suits
 * @author - bornkiller <hjj491229492@hotmail.com>
 */

const sum = require('../lib');

describe('node-lib-starter suits', function () {
  it('simple case', function () {
    expect(sum(1, 2, 3)).toEqual(6);
  });
});
